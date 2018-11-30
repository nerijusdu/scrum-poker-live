import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import apiService from '../services/apiService';
import * as appActions from '../store/actions/AppActions';

class Login extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Login'
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  login = () => {
    apiService.login({
      Email: this.state.email,
      Password: this.state.password
    })
      .then(res => {
        if (res) {
          AsyncStorage.setItem("UserToken", res.data.token);
          this.props.saveUser(res.data.token, res.data.name);
          this.props.navigation.navigate('Home');
        }
      });
  }

  render() {
    if (this.props.user.token) {
      this.props.navigation.navigate('Home');
    }
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextField
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          blurOnSubmit={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextField
          ref={input => { this.passwordInput = input; }}
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={this.login}
          secureTextEntry
        />
        <View style={{ paddingTop: 20 }}>
          <Button
            title="Login"
            onPress={this.login}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    paddingBottom: '30%',
    display: 'flex',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
