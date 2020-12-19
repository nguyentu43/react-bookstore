import { Redirect } from 'react-router-dom';
import { useAppContext } from '../context';

export default function withPrevent(Comp) {
  return () => {
    const {
      state: { auth },
    } = useAppContext();

    if (auth.isLogin) {
      return <Redirect to="/store" />;
    }

    return <Comp />;
  };
}
