import React, { Component } from 'react';

// customize error to show to user
// use with caution: only when error OUT OF CONTROL

class ErrorBoundary extends Component {

	state = {
		hasError: false,
		errorMessage: ''
	}

	componentDidCatch = (err, info) => {
		this.setState({hasError: true, errorMessage: err});
	}

	render() {
		if (this.state.hasError) {
			return <h1>{this.state.errorMessage}</h1>
		} else
			return this.props.children;
	}
}

export default ErrorBoundary;