import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
}

const reducer = (state=initialState, action) => {

	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
		    {const oldCount = state.ingredients[action.ingName];
		    		    const updatedIngredients = {
		    		        ...state.ingredients
		    		    }
		    	        updatedIngredients[action.ingName]= oldCount + 1;
		    	        return { 
		    	        	ingredients: updatedIngredients,
		    	        	totalPrice: state.totalPrice + action.price
		    	        };}

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