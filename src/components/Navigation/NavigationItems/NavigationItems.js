import React from "react";
import Item from './Item/Item'
import classes from './NavigationItems.module.css'
const navigationItems= ()=>(
    <ul className={classes.NavigationItems}>
        <Item link={'/'} exact>Burger Builder</Item>
        <Item link={'/orders'}>My Orders</Item>
    </ul>
)
export default navigationItems;