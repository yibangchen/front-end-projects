import React, { Component } from 'react';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Aux from '../components/hoc/Aux'
import withClass from '../components/hoc/withClass';

class App extends Component {

  state = {
  	persons: [
  		{ id:'azd', name: 'Patrick', age: 22},
  		{ id:'bed', name: 'Tulip', age: 32},
      { id:'bea', name: 'David', age: 12}
  	],
  	otherState: '',
  	showPersons: false,
    toggleClicked: 0
  }

  togglePersonsHandler = () => {
  	const doesShow = this.state.showPersons;

    this.setState( (prevState,props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
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
      <Aux>
        <Cockpit 
          showPersons={ this.state.showPersons }
          persons={ this.state.persons }
          clicked={ this.togglePersonsHandler }
        />
        { persons }      			
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
