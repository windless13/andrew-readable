import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Readable from './Readable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Readable />, document.getElementById('root'));
registerServiceWorker();
