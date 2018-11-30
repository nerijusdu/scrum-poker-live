import React from 'react';
import {View, StyleSheet, Button, Modal} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import apiService from '../services/apiService';

class CreateRoomModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      name: '',
      password: ''
    };
  }

  createRoom = () => {
    if (!this.state.name) {
      this.setState({ touched: true })
      return;
    }

    apiService.createRoom({
      Name: this.state.name,
      Password: this.state.password || null
    })
      .then(() => this.props.onRequestClose());
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
        >
          <View style={styles.modal}>
            <TextField
              label="Name"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              blurOnSubmit={false}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              error={!this.state.touched || this.state.name ? null : 'Name is required'}
            />
            <TextField
              label="Password (optional)"
              ref={input => { this.passwordInput = input; }}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={this.createRoom}
              secureTextEntry
            />
            <View style={styles.button}>
              <Button
                title="Create room"
                onPress={this.createRoom}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10
  },
  modal: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  }
});

export default CreateRoomModal;
