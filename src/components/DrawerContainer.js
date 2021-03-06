import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import * as appActions from '../store/actions/AppActions';
import showIf from '../helpers/showIf';

const authRoutes = [
  'Rooms'
];
const unAuthRoutes = [
  'Login',
  'Register'
];
const hiddenRoutes = [
  'Room'
];

class DrawerContainer extends React.Component {

  render() {
    const { navigation, saveUser } = this.props
    const isLoggedIn = !!this.props.user.token;
    return (
      <View style={styles.container}>
        {navigation.state.routes.map(route => {
          const requiresLogin = authRoutes.includes(route.key);
          const requiresNoLogin = unAuthRoutes.includes(route.key);
          const hidden = hiddenRoutes.includes(route.key);
          
          let shouldDisplay =  requiresNoLogin ? !isLoggedIn : !requiresLogin || isLoggedIn;
          shouldDisplay = hidden ? false : shouldDisplay;

          return (
            <Text
              onPress={() => navigation.navigate(route.key)}
              style={[styles.uglyDrawerItem, showIf(shouldDisplay)]}
              key={route.key}>
              {route.routeName}
            </Text>
          );
        })}
        <Text
          onPress={() => {
            AsyncStorage.removeItem("UserToken");
            saveUser(null, '');
            navigation.navigate('Login');
          }}
          style={[styles.uglyDrawerItem, showIf(isLoggedIn)]}
        >
          Logout
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  uglyDrawerItem: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 15,
    margin: 5,
  }
});

const mapStateToProps = (state) => ({
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);