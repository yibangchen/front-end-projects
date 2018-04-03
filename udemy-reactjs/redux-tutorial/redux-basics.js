const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
	counter: 0
}

// reducer - 1 per project
const rootReducer = (state = initialState, action) => {
	if (action.type === 'INC_COUNTER') {
		// always do it immutably!!
		return {
			...state,
			counter: state.counter + 1
		}
	} else if (action.type === 'ADD_COUNTER') {
		// always do it immutably!!
		return {
			...state,
			counter: state.counter + action.value
		}
	}

	return state; // updated state
};

// store
const store = createStore(rootReducer);
console.log(store.getState());


// subscription - listener for state change
store.subscribe( () => {
	console.log('[Subscription]', store.getState());
})

// dispatching action
store.dispatch({ type: 'INC_COUNTER' }); //unique identifier
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log(store.getState());

