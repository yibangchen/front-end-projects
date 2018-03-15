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
		totalPrice: 4,
		purchasable: false
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount +1;
		const updatedIngrediates = {...this.state.ingredients};
		updatedIngrediates[type] = newCount;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({totalPrice: newPrice, ingredients: updatedIngrediates});
		this.updatePurchaseState(updatedIngrediates);
	}

	removeIngredientHandler = (type) => {
		const newCount = this.state.ingredients[type] -1;
		if (newCount >= 0){
			const newIngredients = {...this.state.ingredients}
			newIngredients[type] = newCount;
			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
			this.setState({ingredients: newIngredients, totalPrice: newPrice})
			this.updatePurchaseState(newIngredients);
		}
	}

	updatePurchaseState (ings) {
		const ingCount = Object.keys(ings)
			.map(key => {return ings[key];})
			.reduce((sum, el) => {return sum + el}, 0);
		// console.log(`count: ${ingCount}`, this.state.ingredients) 
		this.setState({purchasable: ingCount > 0});
	}


	render () {
		const disabledInfo = {...this.state.ingredients};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					added={this.addIngredientHandler} 
					removed={this.removeIngredientHandler} 
					disabled={disabledInfo}
					price={this.state.totalPrice.toFixed(1)}
					purchasable={this.state.purchasable}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;