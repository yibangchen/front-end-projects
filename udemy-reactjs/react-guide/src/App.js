import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Radium from 'radium';
import Person from './Person/Person';

class App extends Component {

  state = {
  	persons: [
  		{ id:'azd', name: 'Patrick', age: 22},
  		{ id:'bed', name: 'Tulip', age: 32},
      { id:'bed', name: 'David', age: 12}
  	],
  	otherState: '',
  	showPersons: false
  }

  togglePersonsHandler = () => {
  	const doesShow = this.state.showPersons;
  	this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = (personIndex) => {
  	// const persons = this.state.persons.slice();
  	const persons = [...this.state.persons];
  	persons.splice(personIndex, 1);
  	this.setState({ persons: persons})
  }

  nameChangedHandler = (event, id) => {
  	const personIndex = this.state.persons.findIndex(p => {
  		return p.id === id;
  	});

  	const person = {...this.state.perons[personIndex]};
  	person.name = event.target.value;

  	const persons = [...this.state.persons];
  	persons[personIndex]=person;

  	this.setState( { persons: persons });
  }

  render() {

  	const style = {
  		backgroundColor: 'white',
  		font: 'inherit',
  		border: '1px solid blue',
  		padidng: '8px',
  		cursor: 'pointer'
      // ,
      // ':hover': {
      //   backgroundColor: 'lightgreen',
      //   color: 'black'
      // }
  	};

  	let persons = null;

  	if (this.state.showPersons) {
  		persons = (
  			<div>
  				{this.state.persons.map( (person, index) => {
  					return <Person 
  						click = {() => this.deletePersonHandler(index)}
  						name = {person.name}
  						age = {person.age} 
  						key = {person.id} 
  						changed = { (event) => this.nameChangedHandler(event, person.id)} />
  				})}
	    	</div>
  		);

      style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'lightred',
      //   color: 'black'
      // }

  	}

    // let classes = ['red', 'bold'].join(' ');
    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
        if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hello I'm Yibang</h1>
        <p className={classes.join(' ')}> This is working </p>
        <button 
        	style={style} 
        	onClick={ this.togglePersonsHandler }>Switch Name</button>
        
        { persons }      			
      </div>
    );
  }
}

// export default Radium(App);
export default App;
