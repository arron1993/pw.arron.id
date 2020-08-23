import React from 'react';
import ReactDOM from 'react-dom';
import {v4 as uuid} from 'uuid';

import {wordList} from './wordlist.js';
import './App.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pwType: 'uuid',
      modifiers: [],
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.addSpecialCharactersModifier = this.addSpecialCharactersModifier.bind(this);
  }

  setType(pwType) {
    this.setState({pwType: pwType});
  }

  randomWords(count) {
    count = count || 3;
    const words = [];
    const randomNumbers = new Uint32Array(count);
    window.crypto.getRandomValues(randomNumbers);

    for (let i = 0; i < count; i++) {
      console.log(i);
      const randomNum = randomNumbers[i] % wordList.length;

      words.push(wordList[randomNum]);
    }
    console.log(words);
    return words.join('-');
  }

  getPassword() {
    const methodMap = {
      'uuid': uuid,
      'words': this.randomWords,
    };
    let password = methodMap[this.state.pwType]();
    for (const modifier of this.state.modifiers) {
      password = modifier(password);
    }
    return password;
  }

  toggleSpecialCharacters(e) {
    if (e.target.checked) {
      const modifiers = this.state.modifiers;
      modifiers.push(this.addSpecialCharactersModifier);
      this.setState({modifiers: modifiers});
    } else {
      const modifiers = this.state.modifiers.filter((x) => x !== this.addSpecialCharactersModifier);
      this.setState({modifiers: modifiers});
    }
  }

  getRandomNumber(ceiling) {
    const randomNumber = new Uint32Array(1);
    window.crypto.getRandomValues(randomNumber);
    return randomNumber[0] % ceiling;
  }

  addSpecialCharactersModifier(password) {
    const specialCharacters = ['!', '(', ')', '-', '_', ';', ':', '[', ']', '{', '}'];
    const modifiedPassword = [];
    for (const letter of password) {
      const randomNumber = this.getRandomNumber(100);

      if (randomNumber > 75) {
        const randomCharacterNumber = this.getRandomNumber(specialCharacters.length);
        modifiedPassword.push(specialCharacters[randomCharacterNumber]);
      } else {
        modifiedPassword.push(letter);
      }
    }
    return modifiedPassword;
  }

  render() {
    return (
      <div className='container'>
        <div className='d-flex align-items-center h-100 justify-content-center mt-5'>
          <h1> { this.getPassword() } </h1>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary mr-2" onClick={() => this.setType('uuid')}>UUID</button>
          <button className="btn btn-primary" onClick={() => this.setType('words')}>Words</button>
        </div>

        <div className="row">
          <div className="col-12">
            <label> <input onChange={(e) => this.toggleSpecialCharacters(e)} type="checkbox" name="special-characters"></input> Special Characters </label>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root'),
);
