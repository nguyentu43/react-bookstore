import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withPrevent(Comp) {
  return () => {
    const auth = useSelector(state => state.auth);

    if (auth.isLogin) {
      return <Redirect to="/store" />;
    }

    return <Comp />;
  };
}
