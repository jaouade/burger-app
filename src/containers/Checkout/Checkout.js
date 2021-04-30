import React from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

const checkout = (props) => {
    const continueCheckoutHandler = () => {
        props.history.push('/checkout/contact-data')
    }
    const cancelCheckoutHandler = () => {
        props.history.goBack()
    }

    return (
        <div>
            <CheckoutSummary ingredients={props.ingredients} continueCheckout={continueCheckoutHandler}
                             cancelCheckout={cancelCheckoutHandler}/>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients
    }
}
export default connect(mapStateToProps)(withRouter(checkout));