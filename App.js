import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import CardList from './src/components/CardList';
import Login from './src/components/Login';
import RoomList from './src/components/RoomList';
import store from './src/store';
import DrawerContainer from './src/components/DrawerContainer';
import { saveUser, toggleLoading } from './src/store/actions/AppActions';
import Room from './src/components/Room';

AsyncStorage.getItem("UserToken")
  .then(token => {
    if (token) {
      store.dispatch(saveUser(token, ''));
    }
  })
  .finally(() => store.dispatch(toggleLoading(false)));

const App = createDrawerNavigator({
  Home: CardList,
  Login,
  Rooms: {
    screen: RoomList
  },
  Room
}, { contentComponent: DrawerContainer});

export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);
