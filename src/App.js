import React from 'react';
import './styles/App.css'; // La ruta ahora es relativa a la carpeta `src`
import SlotMachine from './components/SlotMachine';

function App() {
  return (
    <div className="App">
      <SlotMachine />
    </div>
  );
}

export default App;
