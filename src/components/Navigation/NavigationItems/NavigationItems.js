import React from "react";
import Item from './Item/Item'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <Item link={'/'} exact>Burger Builder</Item>
        {props.isAuth ? <Item link={'/orders'}>My Orders</Item> : null}
        {props.isAuth ? <Item link={'/logout'}>LOG OUT</Item> : <Item link={'/login'}>LOG IN</Item>}
    </ul>
)
export default navigationItems;