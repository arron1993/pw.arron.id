import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

import { wordList } from './wordlist.js';
import './App.scss';


class App extends React.Component {
    constructor() {
        super();
        this.state = {pwType : 'uuid'}
    }

    setType(pwType) {
        this.setState({pwType: pwType});    
    }    
    randomWords(count) {
        count = count || 3
        let words = []
        var randomNumbers = new Uint32Array(count);
        window.crypto.getRandomValues(randomNumbers)
        console.log(randomNumbers)
        for (let i = 0; i < count; i++) {
            console.log(i)
            const randomNum = randomNumbers[i] % wordList.length;
    
            words.push(wordList[randomNum]);
        }
        console.log(words)
        return words.join("-")
    }

    render() {
        const methodMap = {
            "uuid": uuid,
            "words": this.randomWords
        }

        return (
            <div className='container'>
                <button onClick={() => this.setType('uuid')}>UUID</button>
                <button onClick={() => this.setType('words')}>Words</button>
                <div className='d-flex align-items-center h-100 justify-content-center mt-5'>                    
                    <h1> { methodMap[this.state.pwType]() } </h1>
                </div>
            </div>
        );
    }
    
    
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
