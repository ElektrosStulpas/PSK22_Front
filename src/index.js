import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom'
import UserProvider from './services/UserContext'

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

ReactDOM.render(
    <UserProvider>
        <Router>
            <App />
        </Router>
    </UserProvider>,
    document.getElementById('root')
);