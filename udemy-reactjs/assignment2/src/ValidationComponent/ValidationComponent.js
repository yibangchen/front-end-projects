import React from 'react';

const validationComponent = (props) => {

	return (
		<div>
		<p>
			{ props.textLength < 5 ? "Text too short" : "Text long enough" }
		</p>
		</div>
	);
}

export default validationComponent;