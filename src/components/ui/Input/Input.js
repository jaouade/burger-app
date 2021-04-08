import classes from './Input.module.css'

const input = (props) => {
    let input;
    switch (props.inputtype) {
        case 'input':
            input = <input className={classes.InputEl} {...props}/>
            break
        case 'textarea':
            input = <textarea className={classes.InputEl}  {...props}/>
            break

        case 'select':
            input = (
                <select className={classes.InputEl}  {...props}>
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
            input = <input className={classes.InputEl} {...props}/>
            break
    }
    return (
        <div className={classes.Input}>
            <label style={{float:'left'}} className={classes.Label} htmlFor="">{props.label}</label>
            {input}
            {props.errors !== undefined && props.errors !== null && props.error !== [] ?
                <small style={{color: 'red'}}>{props.errors.join(<br/>)}</small> : null}
        </div>
    )
}
export default input;