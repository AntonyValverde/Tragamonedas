// InfoButton.js
import React, { useState } from 'react';
import '../styles/InfoButton.css';

const InfoButton = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="info-button-container">
      <button className="info-button" onClick={toggleInfo}>ℹ️</button>
      {showInfo && (
        <div className="info-modal">
          <section>
            <h3>Premios</h3>
            <ul>
              <li>🍒 x3: 50 puntos</li>
              <li>🔔 x3: 75 puntos</li>
              <li>🍉 x3: 100 puntos</li>
              <li>⭐️ x3: 150 puntos</li>
            </ul>
          </section>
          <section>
            <h3>Apuestas</h3>
            <ul>
              <li>Apuesta $5: Gana el premio indicado</li>
              <li>Apuesta $15: Gana el doble del premio</li>
              <li>Apuesta $30: Gana cuatro veces el premio</li>
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
