import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './components/App'; //входная точка всех компонентов

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( //рендер входной точки (App)
  //StrictMode - инструмент  для обнаружения ошибок, проблем в приложении
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
