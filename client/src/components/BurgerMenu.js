import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="burger-container">
      <button className="burger-icon" onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <div className="burger-menu">
          <Link to="/" onClick={() => setOpen(false)}>Lista Chatroomów</Link>
          <Link to="/student-panel" onClick={() => setOpen(false)}>Panel Ucznia</Link>
        </div>
      )}
    </div>
  );
}
