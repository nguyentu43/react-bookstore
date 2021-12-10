import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withAuth(Comp, options = { checkAdmin: false }) {
  return () => {
    const auth = useSelector(state => state.auth);

    if (!auth.isLogin) {
      return <Redirect to="/store/login" />;
    }

    if (options.checkAdmin && !auth.isAdmin) {
      return <Redirect to="/store" />;
    }

    return <Comp />;
  };
}
