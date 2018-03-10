import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    usernames: ["KittenC", "BunnieZ"]
  }

  updateInput = (event) => {
    const names = [...this.state.usernames];
    names[0] = event.target.value;
    this.setState({ usernames: names});
  }

  render() {
    return (
      <div className="App">
        <div className="Content">
          <UserInput change={ this.updateInput }
              currName = {this.state.usernames[0]} />
          <UserOutput username={this.state.usernames[0]}>Who am I?</UserOutput>

          <UserInput change={ this.updateInput } 
              currName = {this.state.usernames[1]} />
          <UserOutput username={this.state.usernames[1]}>Where am I from?</UserOutput>
        </div>
      </div>
    );
  }
}

export default App;
