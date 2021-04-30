import React from "react";
import classes from './Button.module.css'
const button = (props)=>(
    <button style={props.style} disabled={props.disabled} {...props} className={[classes.Button,classes[props.btntype]].join(' ')} onClick={props.clicked}>{props.children}</button>
)
export default button;