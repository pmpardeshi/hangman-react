import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words'
import AlphaButtons from "./AlphaButtons";


class Hangman extends Component {
  // by default, allow 6 guesses and use provided gallows images.
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { word: "awesome", nWrong: 0, guessed: new Set() };

  }

  /* guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  checkGuessedWord() {

    const guessedWord = this.state.word
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")).join("");

    return guessedWord
  }

  /* handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */

  handleGuess = (evt) => {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (this.state.word.includes(ltr) ? 0 : 1)
    }));
  }

  /* handleReset: handle Resetting the game:
    - set to original State
    - change the default word for guessing
  */

  handleReset = (evt) => {
    this.setState(st => ({
      word: randomWord(),
      guessed: new Set(),
      nWrong: 0
    }));
  }

  render() {
    const guessedWord = this.checkGuessedWord()
    let block;

    if (this.state.nWrong !== this.props.maxWrong) { //check for gameover
      if (guessedWord === this.state.word) {//check for win
        block = <h2 className='Hangman-btns'>Congrats, You Won!</h2>
      }
      else {
        block = <AlphaButtons handleGuess={this.handleGuess} guessed={this.state.guessed} />
      }
    }
    else {//losing condition
      block = <p className='Hangman-btns'>Try again, correct Word was - {this.state.word} </p>
    }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} Wrong Guesses`} />
        <div>
          <p className='Hangman-title'>{`Total Wrong Guesses ${this.state.nWrong}`}</p>
          <p className='Hangman-word'>{guessedWord}</p>
          {block}
        </div>
        <button className="Hangman-reset" onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Hangman;
