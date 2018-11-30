import React from 'react';
import {View, Button, Modal, StyleSheet} from 'react-native';
import {TextField} from 'react-native-material-textfield';

class EnterRoomModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      password: ''
    };
  }

  enterRoom = () => {
    if (!this.state.password) {
      this.setState({ touched: true })
      return;
    }
    this.props.onSubmit(this.props.selectedRoomId, this.state.password);
    this.props.onRequestClose();
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
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              error={!this.state.touched || this.state.password ? null : 'Password is required'}
              onSubmitEditing={this.enterRoom}
              secureTextEntry
            />
            <View style={styles.button}>
              <Button
                title="Enter room"
                onPress={this.enterRoom}
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

export default EnterRoomModal;
