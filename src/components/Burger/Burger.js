import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
     // burgerBuilder.js give us an object, but we need an array to could do map
        .map( ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, index) => {
                // we transform an object of key value pais into an array of burger ingredients
                //map((_,index)) index is the important, not the element, it's why we use underscore
                return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el)
            //take the given element (el) & add it to this array.
        }, []);
        //reduce tranform an array to something elese
   
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;