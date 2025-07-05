import React, { useState, useEffect } from 'react';
import './StudentPanel.css';

const defaultProfilePic = 'https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg';

const allSubjects = [
  'Matematyka',
  'Fizyka',
  'Chemia',
  'Informatyka',
  'Biologia',
  'Historia',
  'Język polski',
  'Język angielski',
  'Wiedza o społeczeństwie',
  'Język Niemiecki',
  'Język hiszpański',
  'Geografia',
];

const isMentor = true; // lub false


export default function StudentPanel({ selectedExtendedSubjects, setSelectedExtendedSubjects }) {
  const [editing, setEditing] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedExtendedSubjects);

  // Przykładowe dane ucznia
  const className = '3A'; // tutaj możesz podłączyć prawdziwe dane użytkownika
  const points = 123;     // przykładowe punkty

  useEffect(() => {
    setTempSelected(selectedExtendedSubjects);
  }, [selectedExtendedSubjects]);

  const toggleSubject = (subject) => {
    if (tempSelected.includes(subject)) {
      setTempSelected(tempSelected.filter((s) => s !== subject));
    } else {
      setTempSelected([...tempSelected, subject]);
    }
  };

  const saveChanges = () => {
    setSelectedExtendedSubjects(tempSelected);
    setEditing(false);
  };

  return (
    <div className="student-panel-wrapper">
      <header className="student-panel-header">
        <h1>Hej, Alicja!</h1>
      </header>

      <div className="profile-section">
        <img src={defaultProfilePic} alt="Profilowe" className="profile-pic" />
        <div className="profile-data">
          <p className="class-info"><strong>Klasa:</strong> {className}</p>

          <div className="subjects-section">
            <div className="subjects-header">
              <h2>Przedmioty rozszerzone</h2>
              {isMentor && <span className="flare small-flare">(jesteś mentorem)</span>}
              {!editing && (
                <button onClick={() => setEditing(true)} className="edit-button">
                  Edytuj
                </button>
              )}
            </div>

            {editing ? (
              <>
                <div className="checkbox-list">
                  {allSubjects.map((subject) => (
                    <label key={subject} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={tempSelected.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                      />
                      {subject}
                    </label>
                  ))}
                </div>
                <button onClick={saveChanges} className="save-button">Zapisz</button>
              </>
            ) : (
              <ul className="subjects-list">
                {tempSelected.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            )}
          </div>

          <p className="points"><strong>Punkty za pomoc:</strong> {points}</p>
        </div>
      </div>
    </div>
  );
}
