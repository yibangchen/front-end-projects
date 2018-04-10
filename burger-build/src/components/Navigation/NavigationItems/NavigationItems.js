import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>

        { props.isAuthenticated ?
        	<NavigationItem link="/orders">Orders</NavigationItem> : null}
        { props.isAuthenticated 
        	? <NavigationItem link="/logout">Logout</NavigationItem>
        	: <NavigationItem link="/auth">Authenticate</NavigationItem> 
        }
    </ul>
);

// const navigationItems = (props) => {
// 	let auth = <NavigationItem link="/auth">Authenticate</NavigationItem>;
// 	if (props.isAuthenticated) {
// 		console.log(props.isAuthenticated);
// 		auth = <NavigationItem link="/logout">Logout</NavigationItem>;
// 	}
//     return (<ul className={classes.NavigationItems}>
//             <NavigationItem link="/">Burger Builder</NavigationItem>
//             <NavigationItem link="/orders">Orders</NavigationItem>
//             { auth }
//         </ul>);
// }

export default navigationItems;