import React from "react";
import Item from './Item/Item'
import classes from './NavigationItems.module.css'
const navigationItems= ()=>(
    <ul className={classes.NavigationItems}>
        <Item active link={'/'}>Burger Builder</Item>
        <Item link={'/'}>Checkout</Item>
    </ul>
)
export default navigationItems;