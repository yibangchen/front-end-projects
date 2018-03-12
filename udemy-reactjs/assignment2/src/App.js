import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    input: ''
  }

  updateInput = (event) => {
    this.setState({ input:event.target.value });
  }

  removeChar = (ind) => {
    const newInput = this.state.input.slice(0,ind) + this.state.input.slice(ind+1);
    this.setState({ input: newInput});
  }
 
  render() {
    const map= Array.prototype.map;
        
    let chars = (
      <div>
       { map.call(this.state.input, 
          (ch, ind) => { return <CharComponent click={()=>this.removeChar(ind)} >{ch}</CharComponent> }) 
       }
      </div>
      );

    return (
      <div className="App">
        <input type="text" onChange={ this.updateInput } />
        <p>Input Length: { this.state.input.length }</p>
        <ValidationComponent textLength={this.state.input.length} />
        { chars }
      </div>
    );
  }
}

export default App;
