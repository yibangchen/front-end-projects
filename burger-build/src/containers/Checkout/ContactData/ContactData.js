import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
	
	state = {
		orderForm: {
            name: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'text',
            		placeholder: 'Your Name'
            	},
            	value: 'Yibang Chen',
            	validation: {
            		required: true
            	},
            	valid: true,
            	touched: false
            },
            street: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'text',
            		placeholder: 'Street'
            	},
            	value: '',
            	validation: {
            		required: true
            	},
            	valid: true,
            	touched: false
            },
            zipCode: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'text',
            		placeholder: 'Zip'
            	},
            	value: '',
            	validation: {
            		required: true,
            		minLength: 5,
            		maxLength: 5
            	},
            	valid: true,
            	touched: false
            },
            country: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'text',
            		placeholder: 'Country'
            	},
            	value: '',
            	validation: {
            		required: true
            	},
            	valid: true,
            	touched: false
            },
            email: {
            	elementType: 'input',
            	elementConfig: {
            		type: 'email',
            		placeholder: 'Your email'
            	},
            	value: '',
            	validation: {
            		required: true
            	},
            	valid: true,
            	touched: false
            },
            deliveryMethod: {
            	elementType: 'select',
            	elementConfig: {
            		options: [
            			{value: 'fastest', displayValue: 'Fastest'},
            			{value: 'cheapest', displayValue: 'Cheapest'}
            		]
            	},
            	value: 'fastest',
            	validation: {},
            	valid: true,
            	touched: false
            }
		},
		formIsValid: false
	}

	orderHandler = (event) => {
		event.preventDefault();

		const formData={};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
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

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		updatedFormElement.touched = true;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		this.setState({ formIsValid: formIsValid, orderForm: updatedOrderForm });
	}

	render() {

		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form= (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formEl => (
					<Input 
						key={formEl.id}
						elementType={formEl.config.elementType}
						elementConfig={formEl.config.elementConfig}
						value={formEl.config.value}
						invalid={!formEl.config.valid}
						shouldValidate={formEl.config.validation}
						touched={formEl.config.touched}
						changed={(event) => this.inputChangeHandler(event, formEl.id)} />
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>);
		if (this.props.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{ form }
			</div>
		);
	}
}

const mapStateToProps = state => {
      return {
            ingredients: state.ingr.ingredients,
            price: state.ingr.totalPrice,
            loading: state.order.loading
      };
};

const mapDispatchToProps = dispatch => {
      return {
            onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
      };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));