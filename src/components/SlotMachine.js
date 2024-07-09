import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import Button from './Button';
import Modal from './Modal';
import InfoButton from './InfoButton';
import '../styles/SlotMachine.css';

const SlotMachine = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [message, setMessage] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(100); // Puntaje inicial de 100
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const symbols = ['🍋', '🍒', '🔔', '⭐️', '🍉'];

  useEffect(() => {
    if (!spinning) return;

    const intervalIds = [];
    const newReels = [];

    for (let i = 0; i < 3; i++) {
      const intervalId = setInterval(() => {
        const reelValue = Math.floor(Math.random() * symbols.length);
        newReels[i] = reelValue;
        setReels((prevReels) => {
          const updatedReels = [...prevReels];
          updatedReels[i] = reelValue;
          return updatedReels;
        });
      }, 100); // Cambia los símbolos rápidamente

      intervalIds.push(intervalId);
    }

    setTimeout(() => {
      intervalIds.forEach((id, index) => {
        setTimeout(() => {
          clearInterval(id);
          if (index === 2) {
            setSpinning(false);
            checkWin(newReels);
          }
        }, index * 500); // Detiene cada carrete con 0.5 segundos de diferencia
      });
    }, 7000); // Los carretes giran durante 2 segundos

    return () => intervalIds.forEach(clearInterval);
  }, [spinning]);

  const spin = () => {
    if (spinning || score < 5) return; // No se puede girar si ya está girando o si el puntaje es menor que 5
    setSpinning(true);
    setMessage('');
    setScore((prevScore) => {
      const newScore = prevScore - 5;
      if (newScore <= 0) {
        setShowModal(true);
        return 0;
      }
      return newScore;
    });
  };

  const checkWin = (reels) => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      let reward = 0;
      switch (reels[0]) {
        case 0:
          reward = 25; // 🍋
          break;
        case 1:
          reward = 50; // 🍒
          break;
        case 2:
          reward = 75; // 🔔
          break;
        case 3:
          reward = 150; // ⭐️
          break;
        case 4:
          reward = 100; // 🍉
          break;
        default:
          break;
      }
      setMessage(`¡Ganaste ${reward} puntos!`);
      setScore((prevScore) => prevScore + reward); // Agrega los puntos según el símbolo
    } else {
      setMessage('Intenta de nuevo');
    }
  };

  const resetGame = () => {
    setScore(100);
    setMessage('');
    setShowModal(false);
  };

  return (
    <div className="slot-machine">
      {showModal && <Modal message="Te quedaste sin dinero. Recarga otra vez." onClose={resetGame} />}
      <div className="score">Puntaje: {score}</div> {/* Muestra el puntaje */}
      <div className="frame">
        <div className="reels">
          {reels.map((reel, index) => (
            <Reel key={index} symbol={symbols[reel]} spinning={spinning} />
          ))}
        </div>
      </div>
      <Button onClick={spin} text="Jugar" />
      <div className="message">{message}</div>
      <InfoButton /> {/* Botón de información */}
    </div>
  );
};

export default SlotMachine;
