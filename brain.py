from dotenv import load_dotenv
import os
import pickle
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore
from langchain_openai import OpenAIEmbeddings

load_dotenv(override=True)

def get_retriever():
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small"
    )

    if os.path.exists("faiss_index"):
        vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    else:
        vectorstore = FAISS.from_texts(["Initialisering"], embeddings)


    store = InMemoryStore()
    if os.path.exists("parent_store.pkl"):
        with open("parent_store.pkl", "rb") as f:
            store_data = pickle.load(f)
            store.store = store_data

    
    retriever = ParentDocumentRetriever(
        vectorstore=vectorstore,
        docstore=store,
        child_splitter=RecursiveCharacterTextSplitter(chunk_size=400),
        parent_splitter=RecursiveCharacterTextSplitter(chunk_size=2000),
    )
    return retriever, vectorstore, store
    
def save_memory(vectorstore, store):
    vectorstore.save_local("faiss_index")
    with open("parent_store.pkl", "wb") as f:
        pickle.dump(store.store, f)
    print("Memory saved")
