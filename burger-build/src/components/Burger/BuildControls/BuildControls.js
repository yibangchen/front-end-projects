import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { CONTROLS, INGREDIENT_PRICES } from '../../../constants';

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {CONTROLS.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type, INGREDIENT_PRICES[ctrl.type])}
                removed={() => props.ingredientRemoved(ctrl.type, INGREDIENT_PRICES[ctrl.type])}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuthenticated ? 'ORDER NOW' : 'PLEASE SIGNON'}</button>
    </div>
);

export default buildControls;