import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, View, Text, StyleSheet, TouchableNativeFeedback, Button, Modal, RefreshControl} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import apiService from '../services/apiService';
import showIf from '../helpers/showIf';
import roomApiService from '../services/roomApiService';
import * as appActions from '../store/actions/AppActions';
import { MessageType } from '../constants';

class RoomList extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      isLoaded: false,
      rooms: [{ id: 1, name: 'Test room'}],
      isCreateModalOpen: false,
      isPasswordModalOpen: false,
      selectedRoomId: null,
      refreshing: false
    };

    if (!props.user.token) {
      return;
    }

    this.loadRooms();
  }

  loadRooms = () => {
    apiService.getRooms()
    .then(res => {
      if (res) {
        this.setState({ rooms: res.data, isLoaded: true });
      }
    });
  }

  componentWillUpdate(nextProps) {
    if (!this.state.isLoaded && !this.props.user.token && nextProps.user.token) {
      this.loadRooms();
    }
  }

  enterRoom = (id, pass) => {
    const onConnected = (result) => {
      if (result.success) {
        this.props.navigation.navigate('Room', this.state.rooms.find(x => x.id === id));
      } else {
        this.props.showMessage(result.message || "Something went wrong", MessageType.Error);
      }
    };

    roomApiService().createConnection(id, pass, onConnected);
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.loadRooms}
          />
        }
      >
        <CreateRoomModal
          isOpen={this.state.isCreateModalOpen}
          onRequestClose={() => {
            this.setState({ isCreateModalOpen: false });
            this.loadRooms();
          }}
        />
        <EnterRoomModal
          isOpen={this.state.isPasswordModalOpen}
          onRequestClose={() => this.setState({ isPasswordModalOpen: false, selectedRoomId: null })}
          onSubmit={this.enterRoom}
          selectedRoomId={this.state.selectedRoomId}
        />
        {this.state.rooms.map(x => <RoomItem
          key={x.id}
          name={x.name}
          locked={x.isLocked}
          onPress={x.isLocked
            ? () => this.setState({ isPasswordModalOpen: true, selectedRoomId: x.id })
            : () => this.enterRoom(x.id)
          }
        />)}
        <View style={styles.createRoomButton}>
          <Button
            title="Create room"
            onPress={() => this.setState({ isCreateModalOpen: true })}
          />
        </View>
      </ScrollView>
    );
  }
}

const RoomItem = (props) => (
  <TouchableNativeFeedback onPress={props.onPress}>
    <View style={styles.roomItem}>
      <Text style={styles.roomTitle}>{props.name}</Text>
      <Text style={showIf(props.locked)}>Icon</Text>
    </View>
  </TouchableNativeFeedback>
);

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
              secureTextEntry
            />
            <View style={styles.createRoomButton}>
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
              secureTextEntry
            />
            <View style={styles.createRoomButton}>
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
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  createRoomButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10
  },
  roomItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  roomTitle: {
    fontSize: 16
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

const mapStateToProps = (state) => ({
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
