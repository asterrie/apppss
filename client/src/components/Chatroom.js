import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import './Chatroom.css';

export default function Chatroom({ room, goBack, selectedExtendedSubjects, userName }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { subject, level } = room;
  const roomName = `${subject}_${level}`;

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('https://peerx-chat.onrender.com');

    socketRef.current.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    setMessages([]); // Wyczyść stare wiadomości
    socketRef.current.emit('joinRoom', roomName);
  }, [roomName]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    socketRef.current.emit('message', { room: roomName, message });
    setMessage('');
  };

  return (
    <div className="chatroom-wrapper">
      <button className="back-button" onClick={goBack}>⬅ Wróć do listy pokoi</button>
      <h2>Pokój: {subject} ({level})</h2>

      <div className="messages">
        {messages.map((msg, idx) => {
          const messageText = typeof msg === 'string' ? msg : msg.message || '';
          const sender = typeof msg === 'string' ? 'other' : msg.sender || 'other';

          const isMentor = level === 'Podstawa' && selectedExtendedSubjects?.includes(subject);

          return (
            <div
              key={idx}
              className={`message-wrapper ${sender === 'me' ? 'my-message' : 'other-message'}`}
            >
              {sender === 'me' && (
                <div className="message-meta">
                  <span className="message-username">{userName}</span>
                  {isMentor && <span className="mentor-flare">(mentor)</span>}
                </div>
              )}
              <div className="message-bubble">
                {messageText}
              </div>
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
