let messages = [];
let isLoading = false;

const messagesContainer = document.getElementById('messagesContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const fileButton = document.getElementById('fileButton');
const fileInput = document.getElementById('fileInput');

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(text, sender) {
    if (welcomeMessage && messages.length === 0) {
        welcomeMessage.style.display = 'none';
    }

    messages.push({ text, sender });

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '🧑' : '🐝';

    const content = document.createElement('div');
    content.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}


async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || isLoading) return;
    addMessage(text, 'user');
    messageInput.value = '';
    isLoading = true;
    sendButton.disabled = true;

    try {
        const response = await fetch('http://127.0.0.1:8000/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
      
        addMessage(data.answer, 'bot');
    } catch (error) {
        addMessage('Kunde inte nå mentorn. Är servern igång?', 'bot');
    } finally {
        isLoading = false;
        sendButton.disabled = false;
    }
}

// Ladda upp fil
async function uploadFile(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    isLoading = true;
    sendButton.disabled = true;
    addMessage(`Laddar upp: ${file.name}...`, 'bot');

    try {
        const response = await fetch('http://127.0.0.1:8000/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
            addMessage(`Analys klar! Jag har nu läst in "${file.name}".`, 'bot');
        } else {
            addMessage('Kunde inte ladda upp filen.', 'bot');
        }
    } catch (error) {
        addMessage('Kunde inte ladda upp filen.', 'bot');
    } finally {
        isLoading = false;
        sendButton.disabled = false;
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

fileButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        uploadFile(e.target.files[0]);
    }
});

// Drag & Drop support
document.body.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
        uploadFile(e.dataTransfer.files[0]);
    }
});

// Auto-resize textarea
messageInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});
