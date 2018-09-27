import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import * as appActions from '../store/actions/AppActions';

const authRoutes = ['Rooms'];

class DrawerContainer extends React.Component {

  render() {
    const { navigation, saveUser } = this.props
    const isLoggedIn = !!this.props.user.token;
    return (
      <View style={styles.container}>
        {navigation.state.routes.map(route => {
          const requiresLogin = authRoutes.includes(route.key);
          const shouldDisplay = route.key === 'Login' ? !isLoggedIn : !requiresLogin || isLoggedIn;
          return (<Text
            onPress={() => navigation.navigate(route.key)}
            style={[styles.uglyDrawerItem, { display: shouldDisplay ? 'flex': 'none'}]}
            key={route.key}>
            {route.routeName}
          </Text>);
        })}
        <Text
          onPress={() => {
            saveUser(null, '');
            navigation.navigate('Login');
          }}
          style={[styles.uglyDrawerItem, { display: !isLoggedIn ? 'none': 'flex'}]}>
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
    paddingHorizontal: 20
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