import Burger from '../../Burger/Burger'
import Button from '../../ui/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) =>{
return(
    <div className={classes.Summary}>
        <h1>We hope you like it 😋</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button btntype={'Danger'} clicked={props.cancelCheckout}>CANCEL</Button>
        <Button btntype={'Success'} clicked={props.continueCheckout}>CONTINUE TO CHECKOUT </Button>
    </div>
)
}
export default checkoutSummary;