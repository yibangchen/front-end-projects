import React from 'react';

const userInput = (props) => {
	return (
		<div>
			<input onChange={props.change} type="text" value = {props.currName} />
		</div>
	);
}

export default userInput;