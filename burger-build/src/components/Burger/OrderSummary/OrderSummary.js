import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

	const ingSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return <li><span style={}>{igKey}</span>: {props.ingredients[igKey]}</li>
		})

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Your mega burger is composed of: </p>
			<ul>
				
			</ul>
		</Aux>
	);
};

export default orderSummary;