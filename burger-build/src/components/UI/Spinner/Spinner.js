import React from 'react';

import classes from './Spinner.css';

const spinner = () => (
	<div className={classes.Loader}>
		<div className={classes.Bounce1}></div>
		<div className={classes.Bounce2}></div>
	</div>
);

export default spinner;