import React from 'react';
import './LevelDropdown.css'; // Dodaj plik CSS obok

export default function LevelDropdown({ level, setLevel }) {
  return (
    <div className="level-dropdown">
      <label>
        Wybierz poziom:{' '}
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="Podstawa">Podstawa</option>
          <option value="Rozszerzenie">Rozszerzenie</option>
        </select>
      </label>
    </div>
  );
}
