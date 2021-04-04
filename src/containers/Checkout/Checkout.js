import React, {Component} from "react";

import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import Contact from "./Contact/Contact";

class Checkout extends Component {
    state = {
        ingredients: [
            {
                name: 'salad',
                quantity: 2,
                price: 0.3
            }, {
                name: 'meat',
                quantity: 1,
                price: 1.7
            }, {
                name: 'cheese',
                quantity: 1,
                price: 0.8
            }, {
                name: 'bacon',
                quantity: 3,
                price: 0.4
            },
        ]
    }
    continueCheckoutHandler = () => {
        console.log(this.props)
        this.props.history.replace('/checkout/contact-data')
    }
    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <CheckoutSummary continueCheckout={this.continueCheckoutHandler}
                                 cancelCheckout={this.cancelCheckoutHandler}
                                 ingredients={this.state.ingredients}/>
                <Route exact path={this.props.match.path + '/contact-data'} component={Contact}/>
            </div>
        )
    }

}

export default Checkout;