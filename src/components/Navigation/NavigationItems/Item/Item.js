import React from "react";
import classes from './Item.module.css'
import {NavLink} from "react-router-dom";
const item = (props)=>(
    <li className={classes.Item}><NavLink exact={props.exact} activeClassName={classes.active} to={props.link}>{props.children}</NavLink></li>
)
export default item;