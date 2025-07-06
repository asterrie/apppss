import React, { useState, useEffect } from 'react';
import './StudentPanel.css';

const defaultProfilePic = 'https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg';

const allSubjects = [
  'Matematyka', 'Fizyka', 'Chemia', 'Informatyka', 'Biologia',
  'Historia', 'Język polski', 'Język angielski', 'Wiedza o społeczeństwie',
  'Język Niemiecki', 'Język hiszpański', 'Geografia',
];

const isMentor = true;

export default function StudentPanel({ selectedExtendedSubjects, setSelectedExtendedSubjects }) {
  const [editing, setEditing] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedExtendedSubjects);

  const [name, setName] = useState('Gość');
  const [tempName, setTempName] = useState(name);

  const [profilePic, setProfilePic] = useState(defaultProfilePic);
  const [tempProfilePic, setTempProfilePic] = useState(defaultProfilePic);

  const [className, setClassName] = useState('3');
  const [tempClassName, setTempClassName] = useState('3');

  const points = 123;

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
    setName(tempName);
    setProfilePic(tempProfilePic);
    setClassName(tempClassName);
    setEditing(false);
  };

  return (
    <div className="student-panel-wrapper">
      <header className="student-panel-header">
        {editing ? (
          <div className="name-edit">
            <label>Imię: </label>
            <input value={tempName} onChange={(e) => setTempName(e.target.value)} />
          </div>
        ) : (
          <h1>Hej, {name}!</h1>
        )}
      </header>

      <div className="profile-section">
        <img src={profilePic} alt="Profilowe" className="profile-pic" />
        {editing && (
          <div className="profile-pic-edit">
            <label>Link do zdjęcia profilowego:</label>
            <input
              value={tempProfilePic}
              onChange={(e) => setTempProfilePic(e.target.value)}
            />
          </div>
        )}

        <div className="profile-data">
          <div className="class-section">
            <p><strong>Klasa:</strong> {editing ? (
              <select value={tempClassName} onChange={(e) => setTempClassName(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            ) : (
              className
            )}</p>
          </div>

          <div className="subjects-section">
            <div className="subjects-header">
              <h2>Przedmioty rozszerzone</h2>
              {isMentor && <span className="flare small-flare">(jesteś mentorem)</span>}
              {!editing && (
                <button onClick={() => setEditing(true)} className="edit-button">Edytuj</button>
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