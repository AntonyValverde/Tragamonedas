import React from 'react';
import '../styles/Button.css'; // La ruta ahora es relativa a la carpeta `src`

const Button = ({ onClick, text }) => {
  return <button className="button" onClick={onClick}>{text}</button>;
};

export default Button;
