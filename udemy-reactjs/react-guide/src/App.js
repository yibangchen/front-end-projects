import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    let btnClass = '';

  	if (this.state.showPersons) {
  		persons = (
  			<div>
  				{this.state.persons.map( (person, index) => {
  					return <ErrorBoundary key={person.id}><Person 
  						click = {() => this.deletePersonHandler(index)}
  						name = {person.name}
  						age = {person.age} 
  						key = {person.id} 
  						changed = { (event) => this.nameChangedHandler(event, person.id)} />
              </ErrorBoundary>
  				})}
	    	</div>
  		);

      btnClass = classes.Red;
  	}

    // let classes = ['red', 'bold'].join(' ');
    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
        if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={ classes.App }>
        <h1>Hello I'm Yibang</h1>
        <p className={assignedClasses.join(' ')}> This is working </p>
        <button
          className={ btnClass }
        	onClick={ this.togglePersonsHandler }>Switch Name</button>
        
        { persons }      			
      </div>
    );
  }
}

export default App;
