import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {TextField} from 'react-native-material-textfield';

export default class Login extends React.Component {
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
    console.warn('Logging in', this.state.email, this.state.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextField
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
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
