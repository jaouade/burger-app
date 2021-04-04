import {Component} from "react";
import Button from '../../../components/ui/Button/Button'
import classes from './Contact.module.css'
class Contact extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
            city:'',
            country:''
        }
    }
    render() {
        return (
            <div className={classes.Contact}>
                <h4>Enter your contact data : </h4>
                <form >
                    <input type={'text'} name={'name'} placeholder={'Your name'}/>
                    <input type={'email'} name={'email'} placeholder={'Your email'}/>
                    <input type={'text'} name={'street'} placeholder={'Street'}/>
                    <input type={'text'} name={'postalCode'} placeholder={'Postal code'}/>
                    <input type={'text'} name={'city'} placeholder={'City'}/>
                    <input type={'text'} name={'country'} placeholder={'Country'}/>
                    <Button btnType={'Success'} >ORDER</Button>
                </form>
            </div>
        )
    }
}
export default Contact;