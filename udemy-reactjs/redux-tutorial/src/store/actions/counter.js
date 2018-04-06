import * as actionTypes from './actionTypes';

// action creator
export const increment = () => {
	return {
		type: actionTypes.INCREMENT
	};
};

export const decrement = () => {
	return {
		type: actionTypes.DECREMENT
	};
};

export const add = (value) => {
	return {
		type: actionTypes.ADD,
		value: value
	};
};
