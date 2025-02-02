import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Ckeckout extends Component {

    state = {
        ingredients: null,
        price: 0      
    }
    // we can't use componentDidMount, bc we don't have access to props yet(we didn't render the children) 
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
          
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinueHandler}    
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render = {(props) => (<ContactData 
                        ingredients = {this.state.ingredients}
                        price = {this.state.totalPrice}
                        {...props}
                    />)}
                />
            </div>
        )

    }

     

}


export default Ckeckout;
