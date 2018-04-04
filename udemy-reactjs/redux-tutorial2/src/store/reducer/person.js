import * as actionTypes from '../actions';

const initialState = {
	persons: []
}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD:
			return {
				...state,
				persons: state.persons.concat({
					id: Math.random(), // not really unique but good enough here!
		            name: 'Kitten',
		            age: Math.floor( Math.random() * 40 )
				})
			}
		case actionTypes.DELETE:
			return {
				...state,
				persons: state.persons.filter(p => p.id !== action.pId)
			}
	}
	return state;
}

export default reducer;