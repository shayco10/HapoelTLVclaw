import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, lineno, colno);
  return false;
};

window.onunhandledrejection = function(event) {
  console.error('Unhandled promise rejection:', event.reason);
};

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found');
}
