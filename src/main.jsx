import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import toàn bộ hệ thống style thiết kế Romantic Luxury
import './styles/global.css';
import './styles/animations.css';
import './styles/lock.css';
import './styles/slideshow.css';
import './styles/letter.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
