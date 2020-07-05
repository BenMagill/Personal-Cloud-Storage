import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {CombinedProvider} from "./store/CombinedProvider"
import App from './App';

ReactDOM.render(
    <CombinedProvider>
        <App />
    </CombinedProvider>,
    document.getElementById('root')
);