import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import CardList from './src/components/CardList';
import Login from './src/components/Login';
import store from './src/store';
import DrawerContainer from './src/components/DrawerContainer';

const App = createDrawerNavigator({
  Login,
  Home: CardList,
}, { contentComponent: DrawerContainer});

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);
