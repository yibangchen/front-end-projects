import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

// Global error handler wrapper

const withErrorHandler = (WrappedComponent, axios) => {
	
	// a private class
	return class extends Component{

		state = {
			error: null
		}

		componentDidMount () {
			axios.interceptors.request.use(req => {
				this.setState({error: null});

				// axios object ALWAYS return!!
				return req;
			});
			axios.interceptors.response.use(res => res, err => {
				this.setState({error: err});
			});
		}

		errorConfirmedHandler = () => {
			this.setState({error: null});
		}

		render () {
			return (
				<Aux>
					<Modal 
						show ={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			)
		}
	}
}

export default withErrorHandler;