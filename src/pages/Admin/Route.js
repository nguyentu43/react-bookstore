import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Layout from './Layout';
import Category from './Category';
import Author from './Author';
import User from './User';
import ProductPage from './Product';
import OrderPage from './Order';
import withAuth from '../../hocs/withAuth';

const menu = [
  { name: 'Book', path: 'book' },
  { name: 'Category', path: 'category' },
  { name: 'Author', path: 'author' },
  { name: 'Order', path: 'order' },
  { name: 'User', path: 'user' },
];

export default withAuth(function AdminRoute() {
  return (
    <Layout>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/gallery" component={Gallery} />
        <Route path="/admin/category" component={Category} />
        <Route path="/admin/author" component={Author} />
        <Route path="/admin/user" component={User} />
        <Route path="/admin/book" component={ProductPage} />
        <Route path="/admin/order" component={OrderPage} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </Layout>
  );
}, {checkAdmin: true});
