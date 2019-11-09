import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavigationItem.css';
import { classes } from 'istanbul-lib-coverage';

const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink
            to={props.link} 
            exact={props.exact}
            activeClassName={classes.active}>{props.children}
        </NavLink>        
    </li>
);

export default navigationItem;