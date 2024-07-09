// SlotMachine.js
import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import Button from './Button';
import Modal from './Modal';
import InfoButton from './InfoButton';
import '../styles/SlotMachine.css';  // Importa estilos generales si es necesario

const SlotMachine = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [message, setMessage] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(100); // Puntaje inicial de 100
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [betAmount, setBetAmount] = useState(5); // Estado para almacenar la cantidad de apuesta

  const symbols = ['🍒', '🔔', '⭐️', '🍉'];

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
    if (spinning || score < betAmount) return; // No se puede girar si ya está girando o si el puntaje es menor que la apuesta
    setSpinning(true);
    setMessage('');
    setScore((prevScore) => {
      const newScore = prevScore - betAmount;
      if (newScore <= 0) {
        setShowModal(true);
        return 0;
      }
      return newScore;
    });
  };

  const checkWin = (reels) => {
    if (reels[0] === reels[1] && reels[1] === reels[2]) {
      // Tres figuras iguales
      let reward = 0;
      switch (reels[0]) {
         
        case 0:
          reward = 50; // 🍒
          break;
        case 1:
          reward = 75; // 🔔
          break;
        case 2:
          reward = 150; // ⭐️
          break;
        case 3:
          reward = 100; // 🍉
          break;
        default:
          break;
      }
      setMessage(`¡Ganaste ${reward * (betAmount / 5)} puntos!`);
      setScore((prevScore) => prevScore + (reward * (betAmount / 5))); // Agrega los puntos según el símbolo y la apuesta
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
      // Dos figuras iguales
      setMessage('¡Ganaste 15 puntos!');
      setScore((prevScore) => prevScore + 15 * (betAmount / 5)); // Agrega 15 puntos por dos figuras iguales y la apuesta
    } else {
      setMessage('Intenta de nuevo');
    }
  };

  const resetGame = () => {
    setScore(100);
    setMessage('');
    setShowModal(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
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
      <div className="bet-buttons">
        <Button onClick={() => handleBetAmount(5)} text="Apuesta $5" selected={betAmount === 5} />
        <Button onClick={() => handleBetAmount(15)} text="Apuesta $15" selected={betAmount === 15} />
        <Button onClick={() => handleBetAmount(30)} text="Apuesta $30" selected={betAmount === 30} />
      </div>
      <InfoButton /> {/* Botón de información */}
    </div>
  );
};

export default SlotMachine;
