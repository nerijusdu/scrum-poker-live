import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { AsyncStorage, View, StatusBar } from 'react-native';
import CardList from './src/components/CardList';
import Login from './src/components/Login';
import Register from './src/components/Register';
import RoomList from './src/components/RoomList';
import store from './src/store';
import DrawerContainer from './src/components/DrawerContainer';
import { saveUser, toggleLoading } from './src/store/actions/AppActions';
import Room from './src/components/Room';
import Message from './src/components/Message';
import {init as roomServiceInit} from './src/services/roomApiService';

AsyncStorage.getItem("UserToken")
  .then(token => {
    if (token) {
      store.dispatch(saveUser(token, ''));
    }
  })
  .finally(() => store.dispatch(toggleLoading(false)));

roomServiceInit();

const App = createDrawerNavigator({
  Home: CardList,
  Login,
  Register,
  Rooms: {
    screen: RoomList
  },
  Room
}, { contentComponent: DrawerContainer });

export default () => (
  <Provider store={store}>
    <View style={{width: '100%', height: '100%', backgroundColor: '#ffffff'}}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
      <App/>
      <Message/>
    </View>
  </Provider>
);
