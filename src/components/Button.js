// Button.js
import React from 'react';
import '../styles/BetButtons.css'; // Importa el archivo de estilos específico para los botones de apuesta

const Button = ({ onClick, text, betAmount, selected }) => {
  const buttonClasses = selected ? `bet-button selected apuesta-${betAmount}` : `bet-button apuesta-${betAmount}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
