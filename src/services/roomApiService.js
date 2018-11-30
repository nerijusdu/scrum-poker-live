import {HubConnectionBuilder} from '@aspnet/signalr';
import { apiUrl } from '../config';
import store from '../store';
import { MessageType } from '../constants';
import { showMessage } from '../store/actions/AppActions';

const empty = () => null;

class RoomApiService {
  constructor(store) {
    this.store = store;
    this.connection = null;
    this.roomId = null;
    this.userList = [];
    this.updateUsers = empty;
    this.updateEstimates = empty;
    this.onDisconnect = empty;
  }

  registerUpdateFunctions(updateUsers, updateEstimates, onDisconnect) {
    this.updateUsers = updateUsers || empty;
    this.updateEstimates = updateEstimates || empty;
    this.onDisconnect = onDisconnect || empty;
  }

  createConnection(id, pass, onConnected) {
    const token = this.store.getState().app.user.token;
    if (!token) {
      this.store.dispatch(showMessage("Please login!", MessageType.Error));
      return null;
    }
    
    this.roomId = id;
    this.connection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/rooms`, {accessTokenFactory: () => token})
      .build();

    this.registerMethods(onConnected || empty);

    return this.connection
      .start()
      .then(() => this.connection.invoke('Subscribe', id, pass))
      .catch(err => {
        console.warn(err);
      });
  }
  
  closeConnection() {
    return this.connection
      .invoke('Unsubscribe', this.roomId)
      .then(() => this.connection.stop())
      .then(() => {
        this.connection = null;
      })
      .catch(err => {
        console.warn(err);
      });
  }

  getConnection() {
    return this.connection;
  }

  chooseEstimate(estimate) {
    return this.connection
      .invoke('AddEstimate', this.roomId, estimate.toString())
      .catch(err => {
        console.warn(err);
      });
  }

  showEstimates() {
    return this.connection
      .invoke('ShowEstimates', this.roomId)
      .catch(err => {
        console.warn(err);
      });
  }

  clearEstimates() {
    return this.connection
      .invoke('ClearEstimates', this.roomId)
      .catch(err => {
        console.warn(err);
      });
  }

  registerMethods(onConnected) {
    this.connection.on("OnConnected", (success, message) => {
      onConnected({success, message});
    });

    this.connection.on("UpdateEstimates", (estimates) => {
      this.updateEstimates(estimates);
    });

    this.connection.on("UpdateUserList", (users) => {
      this.userList = users;
      this.updateUsers(users);
    });
    
    this.connection.on("Disconnect", () => {
      this.connection
        .stop()
        .then(this.onDisconnect);
    });
  }
}

let instance;

export const init = () => {
  instance = new RoomApiService(store);
};

export default () => instance;