require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// App Initialization
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8000;

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})
// Multer Setup for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Real-time Chat with Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Broadcast messages
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Broadcast uploaded files
  socket.on('file upload', (data) => {
    io.emit('file upload', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
