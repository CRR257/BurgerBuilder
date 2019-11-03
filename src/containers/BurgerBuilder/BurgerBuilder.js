import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../hoc/ErrorHandler/errorHandler'


const INGREDIENT_PRICES = {
    //capital letters for a global constant
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4, //base price
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }


    componentDidMount() {
        axios.get('https://burgerbuilderapplication.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;    
        this.setState({totalPrice: newPrice, ingredients: updateIngredients}) 
        this.updatePurchaseState(updateIngredients); //we need the updated ingredients (updateIngredients)
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount < 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients})
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "CRR",
        //         adress: {
        //             street: "Cats Avenue, 75",
        //             zipCode: "3452",
        //             country: "Catalonia"
        //         },
        //         email: "exit257@gmail.com"
        //     },
        //     deliveryMethod: "fastest"
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(error)
        //     })  
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + 
                encodeURIComponent(this.state.ingredients[i]));
            // encode elements to be used un url
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString  
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients,
        };
        // eslint-disable-next-line
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            /* salad, meat... = value of each key (0, 1, 2.) 
            { salad: true, meat:false... }*/
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger =  (
                <Aux>
                    <Burger ingredients= {this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngridientHandler}
                        ingredientRemoved = {this.removeIngridientHandler}
                        disabled = {disabledInfo}
                        purchasable = {this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price = {this.state.totalPrice}
                    />
                </Aux>
            );
            orderSummary =  <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
           
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


export default errorHandler(BurgerBuilder, axios);