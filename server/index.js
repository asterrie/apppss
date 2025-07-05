const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
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


const authRoutes = require('./routes/auth'); // import routera autoryzacji

app.use(express.json());  // middleware do parsowania JSON z body requestów

app.use('/api/auth', authRoutes); 

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

  socket.on('disconnect', () => {
    console.log('Rozłączono:', socket.id);
  });
});

server.listen(4000, () => console.log('Server działa na http://localhost:4000'));
