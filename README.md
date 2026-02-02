# Bee Chat

An AI-powered chatbot that functions as a personal life mentor with long-term memory. The system uses RAG (Retrieval-Augmented Generation) to remember and analyze user journals and previous conversations.

## Features

- Chat interface for conversations with AI mentor
- PDF journal upload for contextual knowledge
- Long-term memory that saves all conversations
- Vector-based search with FAISS for intelligent context retrieval
- Conversation history saved automatically

## Tech Stack

**Backend:**

- FastAPI for REST API
- LangChain for AI orchestration
- OpenAI GPT-4o-mini as language model
- FAISS for vector storage
- PyMuPDF for PDF processing

**Frontend:**

- Vanilla HTML/CSS/JavaScript
- No framework dependencies

## Installation

1. Clone the repository and navigate to the project folder

2. Create and activate virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. **VS Code Setup** (Important):

   - Open Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
   - Type "Python: Select Interpreter"
   - Choose the interpreter from `.venv` folder (should show something like `./.venv/bin/python`)
   - This ensures VS Code uses the correct Python environment

5. Create a `.env` file in the project root:

```
OPENAI_API_KEY=your-openai-api-key
```

## Usage

### Start Backend

```bash
python main.py
```

Backend runs on `http://localhost:8000`

### Start Frontend

Open a new terminal and run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser. (NOT: "Open with live server" in VS Code)

Insert your journals, BeeChat will initialize the file (PDF supported)

Start chatting

## API Endpoints

- `GET /` - Check if server is running
- `POST /upload` - Upload PDF journals
- `POST /ask` - Send messages to AI mentor

## Project Structure

```
.
├── main.py              # FastAPI backend and main logic
├── brain.py             # FAISS retriever and memory management
├── index.html           # Frontend UI
├── style.css            # Styling
├── script.js            # Frontend logic
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (create manually)
└── data/                # Uploaded files and conversation logs (created automatically)
```

## Memory Management

The system automatically creates the following files for long-term memory:

- `faiss_index/` - FAISS vector index
- `parent_store.pkl` - Document store for RAG
- `data/` - Uploaded PDFs and conversation logs

## Security

Remember to:

- Never commit your `.env` file to version control
- Keep your OpenAI API key private

## License

This project is for personal use.

# Bee-Chat
