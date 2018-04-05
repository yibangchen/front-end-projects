import * as actionTypes from '../actions';

const initialState = {
	ingredients: {},
	totalPrice: 4
}

const reducer = (state=initialState, action) => {

    const oldCount = state.ingredients[action.ingName];
    const updatedIngredients = {
        ...state.ingredients
    }

	switch (action.type) {
		case actionTypes.MOUNT_INGREDIENTS:
			return {
				...initialState,
				ingredients: action.ingredients
			}
		case actionTypes.ADD_INGREDIENT:
	        updatedIngredients[action.ingName]= oldCount + 1;
	        return { 
	        	ingredients: updatedIngredients,
	        	totalPrice: state.totalPrice + action.price
	        }

	    case actionTypes.REMOVE_INGREDIENT:
	    	if (oldCount <= 0) { return state; }
	        updatedIngredients[action.ingName]= oldCount - 1;
	        return { 
	        	ingredients: updatedIngredients,
	        	totalPrice: state.totalPrice - action.price
	        }
	}
	return state;
}

export default reducer;