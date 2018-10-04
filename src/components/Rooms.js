import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, StyleSheet, TouchableNativeFeedback, Button} from 'react-native';
import apiService from '../services/apiService';

class Rooms extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      rooms: []
    };

    if (!props.user.token) {
      return;
    }

    apiService.getRooms()
      .then(res => {
        if (res) {
          this.setState({ rooms: res.data, isLoaded: true });
        }
      });
  }

  componentWillUpdate(nextProps) {
    if (!this.state.isLoaded && !this.props.user.token && nextProps.user.token) {
      apiService.getRooms()
        .then(res => {
          if (res) {
            this.setState({ rooms: res.data, isLoaded: true });
          }
        });
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.state.rooms.map(x => <RoomItem key={x.id} name={x.name} locked={x.isLocked}/>)}
        <View style={styles.createRoomButton}>
          <Button
           title="Create room"
           onPress={() => null}
          />
        </View>
      </ScrollView>
    );
  }
}

const RoomItem = (props) => (
  <TouchableNativeFeedback>
    <View style={styles.roomItem}>
      <Text style={styles.roomTitle}>{props.name}</Text>
      <Text style={{ display: props.locked ? 'flex' : 'none' }}>Icon</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10
  },
  createRoomButton: {
    position: 'absolute',
    bottom: 20,
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

export default connect(mapStateToProps)(Rooms);
