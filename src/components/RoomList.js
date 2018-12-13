import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ScrollView, View, Text, StyleSheet, TouchableNativeFeedback, Button, RefreshControl} from 'react-native';
import CreateRoomModal from './CreateRoomModal';
import EnterRoomModal from './EnterRoomModal';
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
      rooms: [],
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
    return apiService.getRooms()
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
          onRequestClose={(response, pass) => {
            this.setState({ isCreateModalOpen: false });
            if (response) {
              this.loadRooms().then(() => this.enterRoom(response.data.id, pass));
            }
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white'
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
  }
});

const mapStateToProps = (state) => ({
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
