import React from 'react';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import CardListModal from './CardListModal';
import showIf from '../helpers/showIf';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEstimates: false,
      myEstimate: null,
      isModalOpen: false,
      isMaster: true
    };
  }

  showEstimates = () => {
    this.setState({ showEstimates: true });
  }

  clearEstimates = () => {
    this.setState({ showEstimates: false, myEstimate: null });
  }

  leaveRoom = () => {
    this.props.navigation.navigate("Rooms");
  }

  render() {
    const { params } = this.props.navigation.state;
    const room = {
      name: params.name,
      users: [
        {
          id: 1,
          username: 'User 1',
          estimate: 5
        },
        {
          id: 2,
          username: 'User 2',
          estimate: 3
        },
        {
          id: 3,
          username: 'User without estimate',
          estimate: null
        }
      ]
    };
    return (
      <View style={style.container}>
        <CardListModal
          isOpen={this.state.isModalOpen}
          onRequestClose={() => this.setState({ isModalOpen: false })}
          onSelectCard={myEstimate => this.setState({ myEstimate, isModalOpen: false })}
        />
        <View style={style.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{room.name}</Text>
        </View>
        <View style={[style.controls, showIf(this.state.isMaster)]}>
          <View style={[style.controlButton, { marginRight: 10 }]}>
            <Button
              title="Clear estimates"
              color="#d50000"
              onPress={this.clearEstimates}
            />
          </View>
          <View style={style.controlButton}>
            <Button
              title="Show estimates"
              onPress={this.showEstimates}
              // disabled={room.users.findIndex(x => x.estimate === null) >= 0}
            />
          </View>
        </View>
        <Button
          title="Choose estimate"
          onPress={() => this.setState({ isModalOpen: true })}
        />
        <ScrollView contentContainerStyle={style.estimates}>
          {
            room.users.map(u => 
              <View style={style.user} key={u.id}>
                <Text>{u.username}</Text>
                <View style={[style.card, showIf(u.estimate !== null)]}>
                  <Text style={style.cardText}>{this.state.showEstimates ? u.estimate : null}</Text>
                </View>
              </View>
            )
          }
        </ScrollView>
        <Button
          title={this.state.isMaster ? "Delete room" : "Leave room"}
          color="#d50000"
          onPress={this.leaveRoom}
        />
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: 10
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    margin: 20
  },
  controls: {
    display: 'flex',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  controlButton: {
    flexGrow: 1
  },
  estimates: {
    marginTop: 10
  },
  user: {
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  card: {
    backgroundColor: '#C2185B',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 22
  }
});

export default Room;