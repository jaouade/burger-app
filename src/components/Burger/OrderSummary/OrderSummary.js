import React from "react";
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import NumberFormat from "react-number-format";
import Button from '../../ui/Button/Button'

const orderSummary = (props) => {
    let ingredients = props.ingredients.map(ingr => <li key={ingr.name}><span
        style={{textTransform: 'capitalize'}}>{ingr.name}</span>: {ingr.quantity}</li>);

    return (
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger 🍔 with the following ingredients 🥓 🥗 🧀 🍖 : </p>
            <ul>
                {ingredients}
            </ul>
            <h2>Total Price : <NumberFormat value={parseFloat(props.price).toPrecision(4)} displayType={'text'}
                                            thousandSeparator={true} prefix={'$'}/></h2>
            <p>Continue to checkout?</p>
            <Button btntype={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btntype={'Success'}
                    clicked={props.purchaseContinued}>{props.isAuth ? 'CONTINUE' : 'SIGN IN SO YOU CAN BUY IT'}</Button>
        </Wrapper>
    )
}

export default orderSummary;