// Button.js
import React from 'react';
import '../styles/BetButtons.css'; // Importa el archivo de estilos específico para los botones de apuesta

const Button = ({ onClick, text, betAmount, selected }) => {
  const buttonClasses = selected ? 'bet-button selected' : 'bet-button';
  const specificClass = `apuesta-${betAmount}`; // Determina la clase específica según la apuesta

  return (
    <button className={`${buttonClasses} ${specificClass}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
