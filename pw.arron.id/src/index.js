import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import './App.scss';

const App = () => {
    return (
        <div className='container' style={{ height: '100vh'}}>
            <div className='d-flex align-items-center h-50 justify-content-center'>
                <h1> { uuidv4() } </h1>
            </div>
        </div>
    );
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
