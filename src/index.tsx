import React from 'react';
import App from './App';
import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);