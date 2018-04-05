import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ingredientsReducer from './store/reducer/ingredients';

const rootReducer = combineReducers({
	ingr: ingredientsReducer
});

const store = createStore(rootReducer);

const app = (
	<BrowserRouter>	
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
