import * as actionTypes from '../actions/actionTypes';
import * as constants from '../../constants';
import { updateObject } from './utility';

const initialState = {
	ingredients: null,
	totalPrice: constants.INIT_PRICE,
	error: false
}

const reducer = (state=initialState, action) => {

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			const updatedIng = {[action.ingName]: state.ingredients[action.ingName]+ 1 }
		    const updatedIngs = updateObject(state.ingredients, updatedIng);
		    const updatedState = {
		    	ingredients: updatedIngs,
		    	totalPrice: state.totalPrice + action.price
		    }
			return updateObject(state, updatedState)
	    case actionTypes.REMOVE_INGREDIENT:
		    {const oldCount = state.ingredients[action.ingName];
		    		    const updatedIngredients = {
		    		        ...state.ingredients
		    		    }
		    	    	if (oldCount <= 0) { return state; }
		    	        updatedIngredients[action.ingName]= oldCount - 1;
		    	        return { 
		    	        	ingredients: updatedIngredients,
		    	        	totalPrice: state.totalPrice - action.price
		    	        };}
	    case actionTypes.SET_INGREDIENTS:
	    	return {
	    		...state,
	    		ingredients: action.ingredients,
	    		totalPrice: constants.INIT_PRICE,
	    		error: false
	    	};
	    case actionTypes.FETCH_INGREDIENTS_FAILED:
	    	return {
	    		...state,
	    		error: true
	    	};
	}
	return state;
}

export default reducer;