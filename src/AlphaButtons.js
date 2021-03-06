import React, { Component } from 'react'
import './AlphaButtons.css'

class AlphaButtons extends Component{
    // by default, use alphabets to create buttons.
    static defaultProps ={
        buttonChars: "abcdefghijklmnopqrstuvwxyz"
    }

    handleClick = (evt)=>{
        this.props.handleGuess(evt)
    }
    
    // generateButtons: return array of letter buttons to render
    generateButtons=()=> {
        return this.props.buttonChars.split("").map(ltr => (
            <button
              key={ltr}
              value={ltr}
              onClick={this.handleClick}
              disabled={this.props.guessed.has(ltr)}
              className="AlphaButtons-button"
            >
              {ltr}
            </button>
        ) );
    }

    render(){
        return( <p className='AlphaButtons'>
       { this.generateButtons()}
         </p>
         );
    }
}
    

export default AlphaButtons