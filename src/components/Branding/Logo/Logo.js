import React from "react";
import LogoImage from '../../../../src/assets/images/logo.png'
import classes from './Logo.module.css'
const logo = (props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
    <img alt={'Logo'} src={LogoImage}/>
    </div>
)
export default logo;