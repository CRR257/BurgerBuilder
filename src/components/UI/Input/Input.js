import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.inputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid")
        validationError = <p className="ValidationError">Please enter a valid {props.elementConfig.place}</p>;
    }


    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className= {inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea 
                className= {inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />
            break;
        case ('select'): 
            inputElement = (
                <select
                    className= {inputClasses.join(' ')}
                    value={props.value} 
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
         default:
            inputElement = <input 
                className= {inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value} onChange={props.changed} />;
            break;
    }
 
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};


export default input;