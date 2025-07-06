import React, { useState } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import LevelDropdown from './components/LevelDropdown';
import ChatroomList from './components/ChatroomList';
import Chatroom from './components/Chatroom';
import StudentPanel from './components/StudentPanel';
import BurgerMenu from './components/BurgerMenu';

// Importujesz widoki logowania i rejestracji
import Login from './components/Login';
import Register from './components/Register';

export default function App() {
  const location = useLocation();
  const [level, setLevel] = useState('Podstawa');
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [selectedExtendedSubjects, setSelectedExtendedSubjects] = useState([
    'Matematyka',
    'Fizyka',
    'Informatyka',
  ]);

  // 🟢 Ukrywasz dropdown i burger menu na stronach logowania/rejestracji
  const hideUI = location.pathname === '/student-panel' || 
                 location.pathname === '/login' || 
                 location.pathname === '/register';

  return (
    <>
      {!hideUI && <LevelDropdown level={level} setLevel={setLevel} />}
      {!hideUI && <BurgerMenu />}

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
                selectedExtendedSubjects={selectedExtendedSubjects}
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

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
