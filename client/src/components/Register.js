import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const allSubjects = [
  'Matematyka', 'Fizyka', 'Chemia', 'Informatyka', 'Biologia',
  'Historia', 'Język polski', 'Język angielski', 'Wiedza o społeczeństwie',
  'Język Niemiecki', 'Język hiszpański', 'Geografia',
];

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // DODANE pole hasła
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState('1');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

// ... reszta kodu bez zmian ...

const handleRegister = async (e) => {
  e.preventDefault();

  if (
    username.trim() === '' ||
    password.trim() === '' ||
    selectedSubjects.length === 0
  ) {
    alert('Uzupełnij nazwę, hasło i wybierz przynajmniej jeden przedmiot.');
    return;
  }

  try {
    const response = await fetch('https://peerx-chat.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        className: selectedClass,
        extendedSubjects: selectedSubjects,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Coś poszło nie tak podczas rejestracji.');
      return;
    }

    // Dopasowane do backendowego obiektu user i tokena:
    setUser({
      username: data.user.username,
      className: data.user.className,
      extendedSubjects: data.user.extendedSubjects,
      token: data.token,
    });

    navigate('/student-panel');
  } catch (error) {
    alert('Błąd sieci lub serwera.');
    console.error(error);
  }
};


  return (
    <div className="register-wrapper">
      <h2>Rejestracja</h2>

      <form onSubmit={handleRegister}>
        <label>Nazwa użytkownika:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Wpisz swoją nazwę"
        />

        <label>Hasło:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wpisz hasło"
        />

        <label>Klasa:</label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label>
          Wybierz przedmiot rozszerzony{' '}
          <span className="flare">będziesz mentorem</span>
        </label>

        <div className="checkbox-list">
          {allSubjects.map((subject) => (
            <label key={subject}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                onChange={() => toggleSubject(subject)}
              />
              {subject}
            </label>
          ))}
        </div>

        <button type="submit">Zarejestruj się</button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </form>
    </div>
  );
}
