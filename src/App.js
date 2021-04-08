import {Route, Switch} from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Toaster} from 'react-hot-toast';
import Checkout from "./containers/Checkout/Checkout";
import Contact from "./containers/Checkout/Contact/Contact";
import Orders from "./containers/Orders/Orders";

function App() {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={"/checkout/contact-data"} exact component={Contact}/>
                    <Route path={"/checkout"} exact component={Checkout}/>
                    <Route path={"/orders"} exact component={Orders}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                </Switch>
                <Toaster/>
            </Layout>
        </div>
    );
}

export default App;
