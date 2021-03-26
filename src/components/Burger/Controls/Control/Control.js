import React from "react";
import classes from './Control.module.css'
const control = (props) =>(
    <div className={classes.Control}>
        <div className={classes.Label}>{props.label}</div>
        <button disabled={props.disabled || props.loading} onClick={props.removed} className={classes.Less}>-</button>
        <button disabled={props.loading} onClick={props.added} className={classes.More}>+</button>
    </div>
)

export default control;