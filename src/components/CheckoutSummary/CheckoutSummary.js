import Burger from '../Burger/Burger'
import Button from '../ui/Button/Button'
import classes from './CheckoutSummary.css'
import Contact from "../../containers/Checkout/Contact/Contact";
const checkoutSummary = (props) =>{
return(
    <div className={classes.Summary}>
        <h1>We hope you like it 😋</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients={JSON.parse(localStorage.getItem('burger'))}/>
        </div>
        <Button btnType={'Danger'} clicked={props.cancelCheckout}>CANCEL</Button>
        <Button btnType={'Success'} clicked={props.continueCheckout}>CONTINUE</Button>
    </div>
)
}
export default checkoutSummary;