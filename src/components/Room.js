import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import CardListModal from './CardListModal';
import showIf from '../helpers/showIf';
import roomApiService from '../services/roomApiService';
import * as appActions from '../store/actions/AppActions';
import { MessageType } from '../constants';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.gracefullyClose = false;
    this.state = {
      showEstimates: false,
      isModalOpen: false,
      isMaster: true,
      users: roomApiService().userList.map(x => ({id: x.id, name: x.name, estimate: null}))
    };

    const userMap = x => {
      const user = this.state.users.find(y => y.id === x.id);
      const estimate = user ? user.estimate : null;

      return {id: x.id, name: x.name, estimate: estimate};
    };

    const estimateMap = estimates => x => {
      const item = estimates.find(y => x.id === y.userId);
      if (item) {
        x.estimate = item.estimate;
      }
      
      return x;
    };

    roomApiService().registerUpdateFunctions(
      users => this.setState({ users: users.map(userMap)}),
      estimates => {
        const showEstimates = !!estimates.find(x => x.estimate !== null || x.estimate !== "");
        this.setState({
          users: this.state.users.map(estimateMap(estimates)),
          showEstimates
        })
      },
      () => {
        if (!this.gracefullyClose) {
          this.props.showMessage("Room was closed", MessageType.Error);
        }
        this.props.navigation.navigate("Rooms");
      }
    );
  }

  chooseEstimate = (myEstimate) => {
    this.setState({ isModalOpen: false });
    roomApiService().chooseEstimate(myEstimate);
  }

  leaveRoom = () => {
    this.gracefullyClose = true;

    roomApiService().closeConnection();
  }

  render() {
    const { params } = this.props.navigation.state;
    const room = {
      name: params.name,
      users: this.state.users
    };
    return (
      <View style={style.container}>
        <CardListModal
          isOpen={this.state.isModalOpen}
          onRequestClose={() => this.setState({ isModalOpen: false })}
          onSelectCard={this.chooseEstimate}
        />
        <View style={style.title}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{room.name}</Text>
        </View>
        <View style={[style.controls, showIf(this.state.isMaster)]}>
          <View style={[style.controlButton, { marginRight: 10 }]}>
            <Button
              title="Clear estimates"
              color="#d50000"
              onPress={() => roomApiService().clearEstimates()}
            />
          </View>
          <View style={style.controlButton}>
            <Button
              title="Show estimates"
              onPress={() => roomApiService().showEstimates()}
              disabled={!!room.users.find(x => x.estimate === null)}
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
                <Text>{u.name}</Text>
                <View style={[style.card, showIf(u.estimate !== null)]}>
                  <Text style={style.cardText}>{this.state.showEstimates ? u.estimate : null}</Text>
                </View>
              </View>
            )
          }
        </ScrollView>
        <Button
          title={this.state.isMaster ? "Close room" : "Leave room"}
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
    padding: 10,
    backgroundColor: 'white'
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

const mapDispatchToProps = (dispatch) => bindActionCreators(appActions, dispatch);

export default connect(null, mapDispatchToProps)(Room);