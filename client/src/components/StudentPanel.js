import React, { useState, useEffect } from 'react';
import './StudentPanel.css';
import { useAuth } from '../context/AuthContext';

const defaultProfilePic = 'https://i.pinimg.com/236x/2c/47/d5/2c47d5bb55c4cd6f5bd1ef.jpg';

const allSubjects = [
  'Matematyka', 'Fizyka', 'Chemia', 'Informatyka', 'Biologia',
  'Historia', 'Język polski', 'Język angielski', 'Wiedza o społeczeństwie',
  'Język Niemiecki', 'Język hiszpański', 'Geografia',
];

const isMentor = true;

export default function StudentPanel() {
  const { user, setUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempClassName, setTempClassName] = useState('1');
  const [tempSelected, setTempSelected] = useState([]);

  useEffect(() => {
    if (user) {
      setTempName(user.username || '');
      setTempClassName(user.className || '1');
      setTempSelected(user.extendedSubjects || []);
    }
  }, [user]);

  const toggleSubject = (subject) => {
    if (tempSelected.includes(subject)) {
      setTempSelected(tempSelected.filter((s) => s !== subject));
    } else {
      setTempSelected([...tempSelected, subject]);
    }
  };

  const saveChanges = () => {
    setUser({
      ...user,
      username: tempName,
      className: tempClassName,
      extendedSubjects: tempSelected,
    });
    setEditing(false);
  };

  return (
    <div className="student-panel-wrapper">
      <header>
        {editing ? (
          <input value={tempName} onChange={(e) => setTempName(e.target.value)} />
        ) : (
          <h1>Hej, {user?.username || 'Gość'}!</h1>
        )}
      </header>

      <p>Klasa: {editing ? (
        <select value={tempClassName} onChange={(e) => setTempClassName(e.target.value)}>
          <option value="1">1</option><option value="2">2</option>
          <option value="3">3</option><option value="4">4</option>
        </select>
      ) : (
        user?.className || '-'
      )}</p>

      <h2>Przedmioty rozszerzone</h2>
      {editing ? (
        allSubjects.map((s) => (
          <label key={s}>
            <input type="checkbox" checked={tempSelected.includes(s)} onChange={() => toggleSubject(s)} />
            {s}
          </label>
        ))
      ) : (
        <ul>{(user?.extendedSubjects || []).map((s) => <li key={s}>{s}</li>)}</ul>
      )}

      {editing ? (
        <button onClick={saveChanges}>Zapisz</button>
      ) : (
        <button onClick={() => setEditing(true)}>Edytuj</button>
      )}
    </div>
  );
}
