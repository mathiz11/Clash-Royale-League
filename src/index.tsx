import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { StoreProvider } from "./components/Store";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <StoreProvider>
        <App/>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
