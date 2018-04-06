import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import burgerBuilderReducer from './store/reducers/burgerBuilder';

const rootReducer = combineReducers({
	ingr: burgerBuilderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(thunk)
));

const app = (
	<BrowserRouter>	
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
