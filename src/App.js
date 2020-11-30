import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import StoreRoute from "./pages/Store/Route";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/store" component={StoreRoute}/>
          <Redirect to="/store"/>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
