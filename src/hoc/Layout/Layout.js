import React, {Component} from 'react'
import Wrapper from '../Wrapper/Wrapper'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    sideDrawerOpenedHandler = () => {
        this.setState((prevSte) => {
            return {showSideDrawer: !prevSte.showSideDrawer}
        })
    }

    render() {
        const  {isAuth} = this.props
        return (
            <Wrapper>
                <div>
                    <Toolbar isAuth={isAuth} clicked={this.sideDrawerOpenedHandler}/>
                    <SideDrawer isAuth={isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>

            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);