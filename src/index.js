import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'; // La ruta ahora es relativa a la carpeta `src`
import App from './App';
import reportWebVitals from './reportWebVitals'; // Asegúrate de que este archivo exista o remueve esta línea

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
