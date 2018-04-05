import React from 'react';
import classes from './Input.css';

const input = (props) => {

	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input 
				{...props.elementConfig}
				onChange={props.changed} 
				value={props.value}
				className={inputClasses.join(' ')}/>
			break;
		case ('textarea'):
			inputElement = <textarea 
				{...props.elementConfig} 
				onChange={props.changed}
				value={props.value}
				className={inputClasses.join(' ')}/>
			break;
		case ('select'):
			inputElement = (
				<select
					{...props.elementConfig}
					onChange={props.changed}
					value={props.value}
					className={inputClasses.join(' ')}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>);
			break;
		default:
			inputElement = <input 
				{...props.elementConfig}
				onChange={props.changed} 
				value={props.value}
				className={inputClasses.join(' ')}/>
		}

	let validationError = null;
	if (props.invalid && props.touched) {
		validationError = <p>Please enter a valid value!</p>
	}

	return	(
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{ inputElement }
			{ validationError }
		</div>);
}

export default input;