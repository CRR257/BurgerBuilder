import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import './ContactData.css'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
      
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients, this.props.price)
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "CRR",
                adress: {
                    street: "Cats Avenue, 75",
                    zipCode: "3452",
                    country: "Catalonia"
                },
                email: "exit257@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
                console.log(response)
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error)
            })  
    }

    render() {
        let form = (
            <form>
                <input className="Input" type= "text" name="name" placeholder="your name" />
                <input className="Input" type= "email" name="email" placeholder="your email" />
                <input className="Input" type= "text" name="street" placeholder="your street" />
                <input className="Input" type= "text" name="postal" placeholder="your postalcode" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>   
        );

        if (this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className="ContactData">
                <h4>Enter your contact data:</h4>  
                {form}     
            </div>
        )
    }

}

export default ContactData;