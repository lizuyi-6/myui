import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

const root = document.getElementById('root');
const application = <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>;
if (root.hasChildNodes() && root.dataset.route === window.location.pathname && !window.location.search) ReactDOM.hydrateRoot(root, application);
else { root.replaceChildren(); ReactDOM.createRoot(root).render(application); }
