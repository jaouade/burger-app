import classes from './Input.module.css'
import {isArrayNotEmpty} from "../../../helpers";

const input = (props) => {
    let input;
    let inputClasses = [classes.InputEl]
    if (isArrayNotEmpty(props.errors)) {
        inputClasses.push(classes.Invalid)
    }
    switch (props.inputtype) {
        case 'input':
            input = <input className={inputClasses.join(' ')} {...props}/>
            break
        case 'textarea':
            input = <textarea className={inputClasses.join(' ')}  {...props}/>
            break

        case 'select':
            input = (
                <select className={inputClasses.join(' ')}  {...props}>
                    {
                        props.options.map((option) => <option defaultValue={option.value}
                                                              key={option.value}
                                                              value={option.value}>{option.display}</option>
                        )
                    }
                </select>
            )
            break
        default:
            input = <input className={inputClasses.join(' ')} {...props}/>
            break
    }


    return (
        <div className={classes.Input}>
            <label style={{float: 'left'}} className={classes.Label} htmlFor="">{props.label}</label>
            {input}
            {isArrayNotEmpty(props.errors) ?
                <small style={{color: 'red'}}>{props.errors.join(<br/>)}</small> : null}
        </div>
    )
}
export default input;