import React, {Component} from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import Contact from "./Contact/Contact";

class Checkout extends Component {
    continueCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }
    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <CheckoutSummary continueCheckout={this.continueCheckoutHandler}
                                 cancelCheckout={this.cancelCheckoutHandler}/>
            </div>
        )
    }

}

export default Checkout;