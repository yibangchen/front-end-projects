import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

	const formedIngredients = Object.keys(props.ingredients)
		.map(ing => {
			return [...Array(props.ingredients[ing])].map((_, i) => {
				return <BurgerIngredient key={ing+i} type={ing} />
			});
		});

	return (
		<div className={ classes.Burger }>
			{formedIngredients}
		</div>
	);
}

export default burger;