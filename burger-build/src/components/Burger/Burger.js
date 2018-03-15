import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

	let formedIngredients = Object.keys(props.ingredients)
		.map(ing => {
			return [...Array(props.ingredients[ing])].map((_, i) => {
				return <BurgerIngredient key={ing+i} type={ing} />
			});
		})	// array of array --> flattened array
		.reduce((arr, el) => {
			return arr.concat(el)
		}, []);

	if (formedIngredients.length === 0) {
		formedIngredients = <p>Please start adding ingredients!</p>
	}

	return (
		<div className={ classes.Burger }>
			<BurgerIngredient type='bread-top' />
			{formedIngredients}
			<BurgerIngredient type='bread-bottom' />		
		</div>
	);
}

export default burger;