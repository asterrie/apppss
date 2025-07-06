import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Uzupełnij wszystkie pola.');
      return;
    }

    try {
      const response = await fetch('https://peerx-chat.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Błąd logowania.');
        return;
      }

     setUser({
  username: data.user.username,
  className: data.user.className,
  extendedSubjects: data.user.extendedSubjects,
  token: data.token,
});


      navigate('/student-panel');
    } catch (error) {
      setError('Błąd sieci lub serwera.');
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Zaloguj się</h2>

      <form onSubmit={handleLogin}>
        <label htmlFor="username">Nazwa użytkownika</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Wpisz nazwę użytkownika"
        />

        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wpisz hasło"
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Zaloguj się</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </form>
    </div>
  );
}
