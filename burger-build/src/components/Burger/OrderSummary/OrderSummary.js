import React from 'react';

import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

	const ingSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
				</li>);
		})

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>Your mega burger is composed of: </p>
			<ul>
				{ingSummary}
			</ul>
			<p>Continue to checkout</p>
		</Aux>
	);
};

export default orderSummary;