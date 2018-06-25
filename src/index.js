import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

import * as development from './config/development';
import * as production from './config/production';
const { NODE_ENV, PUBLİC_URL } = process.env;

window.config = NODE_ENV === 'production' ? production : development;

const firebaseConfig = window.config.firebase;
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
