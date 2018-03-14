import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Aux from '../../hoc/Aux'
import withClass from '../../hoc/withClass';

class Person extends Component {

	componentDidMount () {
		if (this.props.position === 0)
			this.inputElement.focus();
	}

	render () {
		return (
			<Aux>
				<p onClick = {this.props.click}>Hello I am {this.props.name}, {this.props.age} years old</p>
				<p>{this.props.children}</p>
				<input 
					ref={(inp) => { this.inputElement = inp}}	//only available in stateful component
					type="text" onChange={this.props.changed} value={this.props.name}/>
			</Aux>
		);
	}
}

// const person = (props) => {
// 	return (
// 		<Aux>
// 			<p onClick = {props.click}>Hello I am {props.name}, {props.age} years old</p>
// 			<p>{props.children}</p>
// 			<input 
// 				ref={(inp) => {}}	//only available in stateful component
// 				type="text" onChange={props.changed} value={props.name}/>
// 		</Aux>
// 	);
// }

Person.proTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func
}

export default withClass(Person, classes.Person);