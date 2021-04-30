import React from "react";
import Logo from '../../Branding/Logo/Logo'
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../ui/Backdrop/Backdrop'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
const sideDrawer = (props) => {
    const attachedClasses=[classes.SideDrawer,props.open?classes.Open:classes.Close];

    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavigationItems isAuth={props.isAuth}/>
            </div>
        </Wrapper>

    );
}

export default sideDrawer;