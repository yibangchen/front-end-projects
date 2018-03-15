import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3	
}


class BurgerBuilder extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount +1;
		const updatedIngrediates = {...this.state.ingredients};
		updatedIngrediates[type] = newCount;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({totalPrice: newPrice, ingredients: updatedIngrediates});
	}

	removeIngredientHandler = (type) => {
		const newCount = this.state.ingredients[type] -1;
		if (newCount >= 0){
			const newIngredients = {...this.state.ingredients}
			newIngredients[type] = newCount;
			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
			this.setState({ingredients: newIngredients, totalPrice: newPrice})
		}
	}


	render () {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls added={this.addIngredientHandler} removed={this.removeIngredientHandler} />
			</Aux>
		);
	}
}

export default BurgerBuilder;