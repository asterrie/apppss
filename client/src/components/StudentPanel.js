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

export default function StudentPanel({ selectedExtendedSubjects, setSelectedExtendedSubjects }) {
  const { user } = useAuth(); // 👉 TERAZ JEST WEWNĄTRZ

  const [editing, setEditing] = useState(false);

  // Jeśli nie edytujesz, bierz dane z usera z AuthContext
  const name = user?.username || 'Gość';
  const className = user?.className || '-';
  const tempSelected = user?.selectedSubjects || [];

  // Do zmiany zdjęcia — możesz to rozszerzyć jak chcesz:
  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [tempProfilePic, setTempProfilePic] = useState(defaultProfilePic);

  const [tempName, setTempName] = useState(name);
  const [tempClassName, setTempClassName] = useState(className);

  const points = 123; // przykładowo

  const toggleSubject = (subject) => {
    if (tempSelected.includes(subject)) {
      setSelectedExtendedSubjects(tempSelected.filter((s) => s !== subject));
    } else {
      setSelectedExtendedSubjects([...tempSelected, subject]);
    }
  };

  const saveChanges = () => {
    // W pełnej wersji powinieneś zapisać zmiany w AuthContext
    setEditing(false);
  };

  return (
    <div className="student-panel-wrapper">
      <header className="student-panel-header">
        <h1>Hej, {name}!</h1>
      </header>

      <div className="profile-section">
        <img src={profilePic} alt="Profilowe" className="profile-pic" />

        <div className="profile-data">
          <div className="class-section">
            <p><strong>Klasa:</strong> {className}</p>
          </div>

          <div className="subjects-section">
            <div className="subjects-header">
              <h2>Przedmioty rozszerzone</h2>
              {isMentor && <span className="flare small-flare">(jesteś mentorem)</span>}
            </div>

            <ul className="subjects-list">
              {tempSelected.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>

          <p className="points"><strong>Punkty za pomoc:</strong> {points}</p>
        </div>
      </div>
    </div>
  );
}
