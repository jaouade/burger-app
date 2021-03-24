import React  from "react";
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import NumberFormat from "react-number-format";
import Button from '../../ui/Button/Button'
const orderSummary =(props)=>{
        let ingredients = Object.keys(props.ingredients).map(key=><li key={key}><span style={{textTransform:'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>);

        return (
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger 🍔 with the following ingredients 🥓 🥗 🧀 🍖 : </p>
            <ul>
                {ingredients}
            </ul>
            <h2>Total Price : <NumberFormat value={parseFloat(props.price).toPrecision(4)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Wrapper>
    )
}

export default orderSummary;