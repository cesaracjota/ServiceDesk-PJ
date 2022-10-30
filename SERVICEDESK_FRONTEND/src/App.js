import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
