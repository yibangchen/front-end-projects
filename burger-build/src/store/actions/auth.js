import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setRedirect = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT,
		path: path
	}
}

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
}

export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: err
	}
}

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expTime * 1000 ); 
	}
}

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
		const apiKey = 'AIzaSyDMXuvvlGWAlwLNKnx_vZmc_ljSlL74C8E';
		if (!isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
		}
		axios.post(url + apiKey, authData)
			.then(res => {
				console.log(res);

				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', res.data.localId);
				
				dispatch(authSuccess(res.data));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error));
			});
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate <= new Date()){
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
			}
		}
	};
}