import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Toaster} from 'react-hot-toast';
import Checkout from "./containers/Checkout/Checkout";
import Contact from "./containers/Checkout/Contact/Contact";
import Orders from "./containers/Orders/Orders";
import {Component} from "react";
import SignIn from "./containers/Auth/SignIn/SignIn";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions";
import lazy from "./hoc/Lazy/Lazy";


const lazyOrders = lazy(() => {
    return import('./containers/Orders/Orders');
});
const lazyLogout = lazy(() => {
    return import('./containers/Auth/Logout/Logout');
});

const lazySignIn = lazy(() => {
    return import('./containers/Auth/SignIn/SignIn');
});
const lazySignUp = lazy(() => {
    return import('./containers/Auth/SignUp/SignUp');
});
const lazyContact = lazy(() => {
    return import('./containers/Checkout/Contact/Contact');
});
const lazyCheckout = lazy(() => {
    return import('./containers/Checkout/Checkout');
});

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuthState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path={"/login"} exact component={lazySignIn}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Route path={"/sign-up"} exact component={lazySignUp}/>
                <Redirect to={'/'}/>
            </Switch>
        )
        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path={"/checkout/contact-data"} exact component={lazyContact}/>
                    <Route path={"/checkout"} exact component={lazyCheckout}/>
                    <Route path={"/orders"} exact component={lazyOrders}/>
                    <Route path={"/logout"} exact component={lazyLogout}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                    <Redirect to={'/'}/>
                </Switch>
            )
        }
        return (
            <div>
                <Layout>
                    {routes}
                    <Toaster/>
                </Layout>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(authCheckState())
    }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
