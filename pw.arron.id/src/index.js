import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

const App = () => {
    const stuff = "stuff"
    return (
        <div style= {{ backgroundColor: 'red'}}> Hello { stuff } </div>
    );
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
