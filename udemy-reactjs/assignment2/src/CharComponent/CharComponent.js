import React from 'react';

const charComponent = (props) => {
	const styles = {
		"display": "inline-block",
		"padding": "16px",
		"text-align": "center",
		"margin": "16px",
		"border": "1px solid black"
	}

	return (
		<p onClick={props.click}>{props.children}</p>
	);
}

export default charComponent;