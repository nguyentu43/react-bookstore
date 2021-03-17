import React, { Suspense, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import StoreRoute from './pages/Store/Route';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Elements as StripeElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { fetchUserInfo } from './api';
import { useEffect } from 'react';
import { useAppContext } from './context';
import graphQLClient from './graphqlClient';
import LoadingData from './components/LoadingData';
import ScrollTop from 'react-router-scroll-top';
import { setCart, setAuth } from './context/actions';

const AdminRoute = React.lazy(() => import('./pages/Admin/Route'));

const breakpoints = createBreakpoints({
  sm: '578px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

const theme = extendTheme({ breakpoints });

const publicKey = process.env.REACT_APP_STRIPE_PK;
const stripePromise = loadStripe(publicKey);

function App() {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const { user, cart } = await fetchUserInfo();
        dispatch(setAuth({ ...user, isLogin: true }));
        dispatch(setCart(cart));
      } catch (error) {
        graphQLClient.setHeader('authorization', '');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    }
    const token = localStorage.getItem('token');
    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <ChakraProvider theme={theme}>
      {!loading ? (
        <StripeElements stripe={stripePromise}>
          <BrowserRouter>
            <ScrollTop />
            <Suspense fallback={<LoadingData />}>
              <Switch>
                <Route path="/store" component={StoreRoute} />
                <Route path="/admin" component={AdminRoute} />
                <Redirect to="/store" />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </StripeElements>
      ) : (
        <LoadingData />
      )}
    </ChakraProvider>
  );
}

export default App;
