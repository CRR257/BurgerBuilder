import React from 'react';

import './NavigationItem.css';
import { classes } from 'istanbul-lib-coverage';

const navigationItem = (props) => (
    <li className="NavigationItem">
        <a 
            href={props.link}
            className={props.active ? classes.active : null}>{props.children}
        </a>
    </li>
);

export default navigationItem;