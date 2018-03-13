import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

class App extends Component {

  state = {
  	persons: [
  		{ id:'azd', name: 'Patrick', age: 22},
  		{ id:'bed', name: 'Tulip', age: 32},
      { id:'bea', name: 'David', age: 12}
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

  	const person = {...this.state.persons[personIndex]};
  	person.name = event.target.value;

  	const persons = [...this.state.persons];
  	persons[personIndex]=person;

  	this.setState( { persons: persons });
  }

  render() {
  	let persons = null;

  	if (this.state.showPersons) {
  		persons = 
          <Persons 
            persons={ this.state.persons }
            clicked={ this.deletePersonHandler }
            changed={ this.nameChangedHandler } />
  	}

    // let classes = ['red', 'bold'].join(' ');

    return (
      <div className={ classes.App }>
        <Cockpit 
          showPersons={ this.state.showPersons }
          persons={ this.state.persons }
          clicked={ this.togglePersonsHandler }
        />
        { persons }      			
      </div>
    );
  }
}

export default App;
