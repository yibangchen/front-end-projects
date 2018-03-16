import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
			<p><strong>Total price: ${props.totalPrice.toFixed(1)}</strong></p>
			<p>Continue to checkout?</p>
			<Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
			<Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
		</Aux>
	);
};

export default orderSummary;