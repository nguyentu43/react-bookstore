import { Switch, Route, Redirect } from 'react-router-dom';
import Index from './Index';
import Layout from './Layout';
import Single from './Single';
import Search from './Search';
import Checkout from './Checkout';
import Cart from './Cart';

export default function StoreRoute() {
  return <Layout>
      <Switch>
          <Route path="/store" component={Index} exact/>
          <Route path="/store/products/:slug" component={Single} exact />
          <Route path="/store/search" component={Search} exact/>
          {/* <Route path="/store/cart" component={Cart} exact/> */}
          {/* <Route path="/store/checkout" component={Checkout} exact/> */}

          <Redirect to="/store" />
      </Switch>
  </Layout>
}
