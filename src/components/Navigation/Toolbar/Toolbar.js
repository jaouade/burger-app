import React from "react";
import classes from './Toolbar.module.css'
import Logo from '../../../components/Branding/Logo/Logo'
import NavigationItems from "../NavigationItems/NavigationItems";
import Toggle from '../SideDrawer/Toggle/Toggle'
const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <Toggle clicked={props.clicked}/>
        <div className={classes.Logo} >
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
        </nav>
    </header>
);
export default toolbar;