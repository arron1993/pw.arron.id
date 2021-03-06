import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

import { UUIDButton } from "./components/buttons/UUID";
import { WordsButton } from "./components/buttons/words";

import { wordList } from "./wordlist.js";
import "./App.scss";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pwType: "uuid",
      modifiers: [],
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
    this.addSpecialCharactersModifier = this.addSpecialCharactersModifier.bind(
      this
    );
    this.lengthModifier = this.lengthModifier.bind(this);
    this.setType = this.setType.bind(this);
  }

  setType(pwType) {
    this.setState({ pwType: pwType });
  }

  randomWords(count) {
    count = count || 3;
    const words = [];
    const randomNumbers = new Uint32Array(count);
    window.crypto.getRandomValues(randomNumbers);

    for (let i = 0; i < count; i++) {
      const randomNum = randomNumbers[i] % wordList.length;

      words.push(wordList[randomNum]);
    }
    return words.join("-");
  }

  getPassword() {
    const methodMap = {
      uuid: uuid,
      words: this.randomWords,
    };
    let password = methodMap[this.state.pwType]();

    for (const modifier of this.state.modifiers) {
      let tmpPassword = modifier(password);
      password = tmpPassword;
    }
    return password;
  }

  toggleSpecialCharacters(e) {
    if (e.target.checked) {
      const modifiers = this.state.modifiers;
      modifiers.push(this.addSpecialCharactersModifier);
      this.setState({ modifiers: modifiers });
    } else {
      const modifiers = this.state.modifiers.filter(
        (x) => x !== this.addSpecialCharactersModifier
      );
      this.setState({ modifiers: modifiers });
    }
  }

  toggleLengthModifier(e) {
    if (e.target.checked) {
      const modifiers = this.state.modifiers;
      modifiers.push(this.lengthModifier);
      this.setState({ modifiers: modifiers });
    } else {
      const modifiers = this.state.modifiers.filter(
        (x) => x !== this.lengthModifier
      );
      this.setState({ modifiers: modifiers });
    }
  }

  getRandomNumber(ceiling) {
    const randomNumber = new Uint32Array(1);
    window.crypto.getRandomValues(randomNumber);
    return randomNumber[0] % ceiling;
  }

  addSpecialCharactersModifier(password) {
    const specialCharacters = [
      "!",
      "(",
      ")",
      "-",
      "_",
      ";",
      ":",
      "[",
      "]",
      "{",
      "}",
    ];
    const modifiedPassword = [];
    for (const letter of password) {
      const randomNumber = this.getRandomNumber(100);

      if (randomNumber > 75) {
        const randomCharacterNumber = this.getRandomNumber(
          specialCharacters.length
        );
        modifiedPassword.push(specialCharacters[randomCharacterNumber]);
      } else {
        modifiedPassword.push(letter);
      }
    }
    return modifiedPassword.join("");
  }

  lengthModifier(password) {
    let length = document.querySelector('input[name="password-length"]').value;
    if (length > password.length) {
      length = password.length;
    }
    return password.substring(0, length);
  }

  render() {
    return (
      <div className="container-fluid row p-5">
        <div className="col-1 row">
          <div className="col-12">
            <UUIDButton onClick={this.setType}></UUIDButton>
          </div>
          <div className="col-12">
            <WordsButton onClick={this.setType}></WordsButton>
          </div>
        </div>
        <div className="col-2">
          <div className="row">
            <div className="col-12">
              <label>
                <input
                  onChange={(e) => this.toggleSpecialCharacters(e)}
                  type="checkbox"
                  name="special-characters"
                ></input>
                Special Characters
              </label>
            </div>
            <div className="col-12">
              <label>
                <input
                  onChange={(e) => this.toggleLengthModifier(e)}
                  type="checkbox"
                  name="set-length"
                ></input>
                Restrict Length
                <input
                  type="number"
                  name="password-length"
                  defaultValue="16"
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="d-flex align-items-center h-100 justify-content-center mt-5">
            <h1> {this.getPassword()} </h1>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
