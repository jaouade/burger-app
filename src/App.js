import {Route,Switch} from 'react-router-dom'

import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Toaster } from 'react-hot-toast';
import Checkout from "./containers/Checkout/Checkout";
function App() {
  return (
    <div>
      <Layout>
          <Switch>
              <Route path={"/checkout"} component={ Checkout }/>
              <Route path={"/"} exact component={ BurgerBuilder}/>
          </Switch>
          <Toaster/>
      </Layout>
    </div>
  );
}

export default App;
