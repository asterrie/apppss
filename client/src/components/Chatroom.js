import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chatroom.css';


const socket = io('http://localhost:4000');



export default function Chatroom({ room, goBack }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { subject, level } = room;
  const roomName = `${subject}_${level}`;


  useEffect(() => {
    setMessages([]);
    socket.emit('joinRoom', roomName);

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [roomName]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    // Wysyłamy wiadomość z polem sender: 'me'
    socket.emit('message', { room: roomName, message, sender: 'me' });
    setMessage('');
  };

  return (
    <div className="chatroom-wrapper">
      <button className="back-button" onClick={goBack}>⬅ Wróć do listy pokoi</button>
      <h2>Pokój: {subject} ({level})</h2>

      <div className="messages">
        {messages.map((msg, idx) => {
          // Obsługa przypadku gdy msg jest stringiem (np. z backendu)
          const messageText = typeof msg === 'string' ? msg : msg.message || '';
          const sender = typeof msg === 'string' ? 'other' : msg.sender || 'other';

          return (
            <div
              key={idx}
              className={`message-bubble ${sender === 'me' ? 'my-message' : 'other-message'}`}
            >
              {messageText}
            </div>
          );
        })}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość..."
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage}>Wyślij</button>
      </div>
    </div>
  );
}
