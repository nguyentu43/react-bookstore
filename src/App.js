import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import StoreRoute from './pages/Store/Route';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Elements as StripeElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const breakpoints = createBreakpoints({
  sm: '578px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
});

const theme = extendTheme({ breakpoints });

const publicKey =
  'pk_test_51HqzdDEEA28cbsApAzfDLBCRMMwZbMeyDy1mDVRfSzOblaXMy0BCAFbAWEGEvgWHsIr2AXYbEsyKmFxn6sIMjjMy00dp59zFwT';
const stripePromise = loadStripe(publicKey);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <StripeElements stripe={stripePromise}>
        <BrowserRouter>
          <Switch>
            <Route path="/store" component={StoreRoute} />
            <Redirect to="/store" />
          </Switch>
        </BrowserRouter>
      </StripeElements>
    </ChakraProvider>
  );
}

export default App;
