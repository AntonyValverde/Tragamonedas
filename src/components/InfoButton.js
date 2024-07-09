import React, { useState } from 'react';
import '../styles/InfoButton.css';

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="info-button-container">
      <button className="info-button" onClick={toggleInfo}>i</button>
      {showInfo && (
        <div className="info-modal">
          <h3>Premios</h3>
          <ul>
            <li>🍋 x3: 25 puntos</li>
            <li>🍒 x3: 50 puntos</li>
            <li>🔔 x3: 75 puntos</li>
            <li>🍉 x3: 100 puntos</li>
            <li>⭐️ x3: 150 puntos</li>
          </ul>
          <button onClick={toggleInfo}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
