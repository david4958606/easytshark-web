import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import '@arco-design/web-react/dist/css/arco.css';

// 在 src/index.js 顶部添加
const realWarn = console.warn;
console.warn = function (msg, ...args) {
  if (
    typeof msg === 'string' &&
    msg.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return;
  }
  realWarn.call(console, msg, ...args);
};

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
