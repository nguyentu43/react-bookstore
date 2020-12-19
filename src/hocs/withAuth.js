import { Redirect } from 'react-router-dom';
import { useAppContext } from '../context';

export default function withAuth(Comp, options = { checkAdmin: false }) {
  return () => {
    const {
      state: { auth },
    } = useAppContext();

    if (!auth.isLogin) {
      return <Redirect to="/store/login" />;
    }

    if (options.checkAdmin && !auth.isAdmin) {
      return <Redirect to="/store" />;
    }

    return <Comp />;
  };
}
