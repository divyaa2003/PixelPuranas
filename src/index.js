import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Load custom font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    font-family: 'Noto Serif', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #F5F5DC;
  }

  ::-webkit-scrollbar-thumb {
    background: #8B4513;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #483D8B;
  }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();