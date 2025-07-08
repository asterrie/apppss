io.on('connection', (socket) => {
  console.log('Nowe połączenie:', socket.id);

  socket.on('joinRoom', async (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} dołączył do pokoju ${room}`);

    // 👉 Wysyłasz historię czatu:
    const messages = await Message.find({ room }).sort({ createdAt: 1 }).lean();
    socket.emit('chatHistory', messages);
  });

  socket.on('message', async ({ room, message, sender }) => {
    // 👉 Poprawione: Zapisz nową wiadomość w MongoDB
    const newMsg = await Message.create({
      room,
      sender,
      message
    });

    // 👉 Wyślij nadawcy (jako 'me')
    socket.emit('message', { ...newMsg.toObject(), sender: 'me' });

    // 👉 Wszyscy inni w pokoju dostają 'other'
    socket.to(room).emit('message', { ...newMsg.toObject(), sender: 'other' });

    console.log(`Wiadomość w pokoju ${room}: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('Rozłączono:', socket.id);
  });
});
