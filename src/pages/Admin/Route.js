import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Gallery from './Gallery';
import Layout from './Layout';
import Category from './Category';

const menu = [
  { name: 'Book', path: 'book' },
  { name: 'Category', path: 'category' },
  { name: 'Author', path: 'author' },
  { name: 'Order', path: 'order' },
  { name: 'User', path: 'user' },
];

export default function AdminRoute() {
  return (
    <Layout>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/gallery" component={Gallery} />
        <Route path="/admin/category" component={Category} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </Layout>
  );
}
