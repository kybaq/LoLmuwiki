import React from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router />
    </Provider>
  );
};

export default App;
