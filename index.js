const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://peerx.netlify.app',
  },
});
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Połączono z MongoDB'))
.catch((err) => console.error('Błąd połączenia z MongoDB:', err));

// Socket.io
io.on('connection', (socket) => {
  console.log('Nowe połączenie:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} dołączył do pokoju ${room}`);
  });

  socket.on('message', ({ room, message }) => {
    // 👉 Nadawca dostaje wiadomość z 'me'
    socket.emit('message', { message, sender: 'me' });

    // 👉 Wszyscy inni w pokoju dostają wiadomość z 'other'
    socket.to(room).emit('message', { message, sender: 'other' });

    console.log(`Wiadomość w pokoju ${room}: ${message}`);
  });

  socket.on('message', (msg) => {
  console.log('Odebrano wiadomość:', msg); // ⬅ zobacz co przychodzi
  setMessages((prev) => [...prev, msg]);
});

  socket.on('disconnect', () => {
    console.log('Rozłączono:', socket.id);
  });
});

server.listen(process.env.PORT || 4000, '0.0.0.0', () =>
  console.log(`Server działa na http://localhost:4000`)
);
