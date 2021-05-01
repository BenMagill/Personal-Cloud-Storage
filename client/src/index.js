import React from 'react';
import ReactDOM from 'react-dom';
import { CombinedProvider } from "./store/CombinedProvider"
import App from './App';
import './index.css';

ReactDOM.render( <
    CombinedProvider >
    <
    App / >
    <
    /CombinedProvider>,
    document.getElementById('root')
);