import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import StoreRoute from "./pages/Store/Route";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "578px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

const theme = extendTheme({ breakpoints });

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
