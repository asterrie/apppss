import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import LevelDropdown from './components/LevelDropdown';
import ChatroomList from './components/ChatroomList';
import Chatroom from './components/Chatroom';
import StudentPanel from './components/StudentPanel';
import BurgerMenu from './components/BurgerMenu';

export default function App() {
  const location = useLocation();
  const [level, setLevel] = useState('Podstawa');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Przechowujemy rozszerzone przedmioty na poziomie App
  const [selectedExtendedSubjects, setSelectedExtendedSubjects] = useState([
    'Matematyka',
    'Fizyka',
    'Informatyka',
  ]);

  const hideDropdown = location.pathname === '/student-panel';

  return (
    <>
      {!hideDropdown && <LevelDropdown level={level} setLevel={setLevel} />}
      <BurgerMenu />

      <Routes>
        <Route
          path="/"
          element={
            selectedRoom ? (
              <Chatroom
                room={{ subject: selectedRoom, level }}
                goBack={() => setSelectedRoom(null)}
              />
            ) : (
              <ChatroomList
                level={level}
                setSelectedRoom={setSelectedRoom}
                selectedExtendedSubjects={selectedExtendedSubjects} // przekazujemy props
              />
            )
          }
        />
        <Route
          path="/student-panel"
          element={
            <StudentPanel
              selectedExtendedSubjects={selectedExtendedSubjects}
              setSelectedExtendedSubjects={setSelectedExtendedSubjects}
            />
          }
        />
      </Routes>
    </>
  );
}
