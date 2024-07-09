import React from 'react';
import '../styles/Modal.css';

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{message}</h2>
        <button onClick={onClose}>Recargar</button>
      </div>
    </div>
  );
};

export default Modal;
