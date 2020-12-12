import { Switch, Route, Redirect } from 'react-router-dom';
import Index from './Index';
import Layout from './Layout';
import Single from './Single';
import Search from './Search';
import Checkout from './Checkout';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import List from './List';
import Wishlist from './Wishlist';
import Order from './Order';

export default function StoreRoute() {
  return <Layout>
      <Switch>
          <Route path="/store" component={Index} exact/>
          <Route path="/store/list/:section/:id" component={List} />
          <Route path="/store/wishlist" component={Wishlist} />
          <Route path="/store/order" component={Order} />
          <Route path="/store/book/:slug" component={Single} exact />
          <Route path="/store/search" component={Search} exact/>
          <Route path="/store/cart" component={Cart} exact/>
          <Route path="/store/checkout" component={Checkout} exact/>
          <Route path="/store/login" component={Login} />
          <Route path="/store/register" component={Register} />
          <Route path="/store/forgot-password" component={ForgotPassword} />
          <Redirect to="/store" />
      </Switch>
  </Layout>
}
