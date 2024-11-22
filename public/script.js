const socket = io();
const chatArea = document.getElementById('chatArea');
const messageForm = document.getElementById('messageForm');
const fileForm = document.getElementById('fileForm');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const fileInput = document.getElementById('fileInput');

// Handle message submission
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (username && message) {
    socket.emit('chat message', { username, message });
    messageInput.value = '';
  }
});

// Handle file upload
fileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        socket.emit('file upload', { username: usernameInput.value, filePath: data.filePath });
      });
    fileInput.value = '';
  }
});

// Display messages
socket.on('chat message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.username}: ${data.message}`;
  chatArea.appendChild(messageElement);
  chatArea.scrollTop = chatArea.scrollHeight;
});

// Display uploaded files
socket.on('file upload', (data) => {
  const fileElement = document.createElement('div');
  fileElement.innerHTML = `${data.username} uploaded: <a href="${data.filePath}" target="_blank">View File</a>`;
  chatArea.appendChild(fileElement);
  chatArea.scrollTop = chatArea.scrollHeight;
});
