import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
