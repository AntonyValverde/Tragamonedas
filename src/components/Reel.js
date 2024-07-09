import React, { useState, useEffect } from 'react';
import '../styles/Reel.css';

const Reel = ({ symbol, spinning }) => {
  const [soundLoaded, setSoundLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio('/sounds/casino.mpeg');
    audio.addEventListener('canplaythrough', () => {
      setSoundLoaded(true);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('canplaythrough', () => {
        setSoundLoaded(false);
      });
    };
  }, []);

  useEffect(() => {
    if (spinning && soundLoaded) {
      const audio = new Audio('/sounds/casino.mpeg');
      audio.play();
    }
  }, [spinning, soundLoaded]);

  return (
    <div className={`reel ${spinning ? 'spinning' : ''}`}>
      <div>{symbol}</div>
    </div>
  );
};

export default Reel;
