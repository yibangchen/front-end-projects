import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

class Auth extends Component {

	state = {
		controls: {
			email: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'email',
            		placeholder: 'Email Address'
            	},
            	value: '',
            	validation: {
            		required: true,
            		isEmail: true
            	},
            	valid: false,
            	touched: false
            },
			password: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'password',
            		placeholder: 'Password'
            	},
            	value: '',
            	validation: {
            		required: true,
            		minLength: 6
            	},
            	valid: false,
            	touched: false
            }
        },
        isSignUp: false
	}

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.onSetAuthRedirectPath();
		}
	}

	inputChangeHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	}

	checkValidity(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignUp: !prevState.isSignUp}
		})
	}

	render () {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElementsArray.map(formEl => (
			<Input
				key={formEl.id}
				elementType={formEl.config.elementType}
				elementConfig={formEl.config.elementConfig}
				value={formEl.config.value}
				invalid={!formEl.config.valid}
				shouldValidate={formEl.config.validation}
				touched={formEl.config.touched}
				changed={(event) => this.inputChangeHandler(event, formEl.id)}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
					<p>{this.props.error.message}</p>
				);
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={(event)=>this.submitHandler(event)}>
					{form}
					<Button btnType="Success">SUBMIT</Button>
				</form>
				<Button 
					clicked={this.switchAuthModeHandler}
					btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.ingr.building, 
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignUp )=>dispatch(actions.auth(email, password, isSignUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setRedirect('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);