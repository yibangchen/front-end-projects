import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
  	persons: [
  		{ id:'azd', name: 'Patrick', age: 22},
  		{ id:'bed', name: 'Tulip', age: 32}
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
  	}

    return (
      <div className="App">
        <h1>Hello I'm Yibang</h1>
        <button 
        	style={style} 
        	onClick={ this.togglePersonsHandler }>Switch Name</button>
        
        { persons }      			
      </div>
    );
  }
}

export default App;
