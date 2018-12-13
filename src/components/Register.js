import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import apiService from '../services/apiService';
import * as appActions from '../store/actions/AppActions';
import { MessageType } from '../constants';
import validationService from '../services/validationService';

class Register extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Register'
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
      emailError: '',
      nameError: '',
      passwordError: '',
      repeatPasswordError: ''
    };
  }

  register = () => {
    if (!this.validate()) {
      return;
    }

    apiService.register({
      Email: this.state.email,
      Name: this.state.name,
      Password: this.state.password
    })
      .then(res => {
        if (res) {
          this.props.showMessage("Account created!", MessageType.Success);
          this.props.navigation.navigate('Login');
        }
      });
  }

  validate = () => {
    const { email, name, password, repeatPassword } = this.state;
    
    const emailError = validationService.validateEmail(email);
    const nameError = validationService.validateLength(name, 3, 'Name');
    const passwordError = validationService.validateLength(password, 6, 'Password');
    const repeatPasswordError = validationService.validateMatch(password, repeatPassword, 'Passwords');

    this.setState({
      emailError,
      nameError,
      passwordError,
      repeatPasswordError
    });

    return !emailError && !nameError && !passwordError && !repeatPasswordError;
  }

  render() {
    if (this.props.user.token) {
      this.props.navigation.navigate('Home');
    }
    return (
      <View style={styles.container}>
        <Text>Register</Text>
        <TextField
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => this.nameInput.focus()}
          error={this.state.emailError}
          blurOnSubmit={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextField
          ref={input => { this.nameInput = input; }}
          label="Name"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          blurOnSubmit={false}
          value={this.state.name}
          error={this.state.nameError}
          onChangeText={name => this.setState({ name })}
        />
        <TextField
          ref={input => { this.passwordInput = input; }}
          label="Password"
          value={this.state.password}
          error={this.state.passwordError}
          onChangeText={password => this.setState({ password })}
          onSubmitEditing={() => this.repeatPasswordInput.focus()}
          blurOnSubmit={false}
          returnKeyType="next"
          secureTextEntry
        />
        <TextField
          ref={input => { this.repeatPasswordInput = input; }}
          label="Repeat password"
          value={this.state.repeatPassword}
          error={this.state.repeatPasswordError}
          onChangeText={repeatPassword => this.setState({ repeatPassword })}
          onSubmitEditing={this.register}
          secureTextEntry
        />
        <View style={{ paddingTop: 20 }}>
          <Button
            title="Register"
            onPress={this.register}
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
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

const mapStateToProps = (state) => ({
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
