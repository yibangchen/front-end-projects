import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
            	value: '',
            	valid: true,
            	touched: false
            }
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});

		const formData={};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(res=>{
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(err=>{
                this.setState({ loading: false});
            })
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
		console.log(updatedFormElement);
		this.setState({orderForm: updatedOrderForm});
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
				<Input elementType="..." elementConfig="..." value="..."/>
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

				<Input inputtype="input" type="email" name="email" placeholder="Your email"/>
				<Input inputtype="input" type="text" name="street" placeholder="Your street"/>
				<Input inputtype="input" type="text" name="postal" placeholder="Your postal"/>
				<Button btnType="Success">ORDER</Button>
			</form>);
		if (this.state.loading) {
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

export default ContactData;