import React from 'react';
import './ChatroomList.css';

const SUBJECTS = {
  Podstawa: ['Matematyka', 'Fizyka', 'Chemia', 'Informatyka', 'Biologia', 'Historia', 'Język polski', 'Język angielski', 'Wiedza o społeczeństwie', 'Język Niemiecki', 'Język hiszpański', 'Geografia'],
  Rozszerzenie: null, // zastąpimy dynamicznie
};

export default function ChatroomList({ level, setSelectedRoom, selectedExtendedSubjects }) {
  const subjectsToShow = level === 'Rozszerzenie' ? selectedExtendedSubjects : SUBJECTS[level];

  return (
    <div>
      <h2>Chatroomy ({level}):</h2>
      <ul>
        {subjectsToShow.map((subject) => (
          <li key={subject}>
            <button onClick={() => setSelectedRoom(subject)}>{subject}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
