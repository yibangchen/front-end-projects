import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name, price) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingName: name,
		price: price
	}
}

export const removeIngredient = (name, price) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingName: name,
		price: price
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
}

export const initIngredients = () => {
	return dispatch => {
		axios.get( 'https://burger-react-ce268.firebaseio.com/ingredients.json')
            .then( res => {
            	dispatch(setIngredients(res.data));
            })
            .catch(err => {
            	dispatch(fetchIngredientsFailed());
            });
	}
}