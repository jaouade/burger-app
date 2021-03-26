import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <Layout>
          <BurgerBuilder/>
          <Toaster/>
      </Layout>
    </div>
  );
}

export default App;
