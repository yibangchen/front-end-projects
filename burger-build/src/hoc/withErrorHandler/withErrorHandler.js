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

		// componentDidMount called AFTER children - interceptors never set
		componentWillMount () {
			// POSSIBLE meme leak!! dead interceptors
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: null});

				// axios object ALWAYS return!!
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(res => res, err => {
				this.setState({error: err});
			});
		}

		// clear memory
		componentWillUnmount() {
			// remove excessive memory
			console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
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