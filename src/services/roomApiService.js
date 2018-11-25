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
  }

  registerUpdateFunctions(updateUsers, updateEstimates) {
    this.updateUsers = updateUsers || empty;
    this.updateEstimates = updateEstimates || empty;
  }

  createConnection(id, pass) {
    const token = this.store.getState().app.user.token;
    if (!token) {
      this.store.dispatch(showMessage("Please login!", MessageType.Error));
      return null;
    }
    this.roomId = id;
    this.connection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/rooms`, {accessTokenFactory: () => token})
      .build();

    this.registerMethods();

    return this.connection
      .start()
      .then(() => {
        console.warn('Connected to hub');
        return this.connection.invoke('Subscribe', id, pass);
      })
      .then(() => this.connection)
      .catch(err => {
        console.warn(err);
      });
  }

  getConnection() {
    return this.connection;
  }

  getUpdateEstimates = () => this.updateEstimates;

  chooseEstimate(estimate) {
    return this.connection
      .invoke('AddEstimate', this.roomId, estimate.toString())
      .catch(err => {
        console.warn(err);
      });
  }

  registerMethods() {
    this.connection.on("OnConnected", (success, message) => {
      console.warn(success, message);
    });

    this.connection.on("UpdateEstimates", (estimates) => {
      this.updateEstimates(estimates);
    });

    this.connection.on("UpdateUserList", (users) => {
      console.warn(users);
      this.userList = users;
      this.updateUsers();
    });
    
    this.connection.on("Disconnect", () => {
      this.connection.stop(); // TODO: notify about disconnection
    });
  }
}

let instance;

export const init = () => {
  instance = new RoomApiService(store);
};

export default () => instance;