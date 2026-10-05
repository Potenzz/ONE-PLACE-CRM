import React from 'react';
import { createRoot } from 'react-dom/client';
import './Assets/Styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AuthLogin } from './AuthComponents/AuthLogin';

const root = createRoot(document.getElementById('root'));
root.render(
  <AuthLogin>
    <App />
  </AuthLogin>
);
registerServiceWorker();
