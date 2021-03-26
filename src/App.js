import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function App() {
  return (
    <div>
      <Layout>
          <BurgerBuilder/>
          <NotificationContainer/>
      </Layout>
    </div>
  );
}

export default App;
