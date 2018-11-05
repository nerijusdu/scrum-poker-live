import { AsyncStorage } from 'react-native';
import { apiUrl } from '../config';
import store from '../store';
import { saveUser, toggleLoading, showMessage } from '../store/actions/AppActions';
import { MessageType } from '../constants';

export class ApiCall {
  defaultHeaders = new Headers({
    'Content-Type': 'application/json'
  })

  call = (url, requestSettings, options) => {
    options = options || {};
    requestSettings = requestSettings || {};
    const headers = requestSettings.headers || this.defaultHeaders;

    if (!options.ignoreLoading) {
      store.dispatch(toggleLoading(true));
    }

    this.appendToken(headers);

    return fetch(`${apiUrl}${url}`, {
      ...requestSettings,
      headers
    })
      .then(x => {
        console.log(x);
        return x;
      })
      .then(this.parseResponse)
      .then(this.handleErrors)
      .catch(() => {
        store.dispatch(showMessage('Something went wrong!', MessageType.Error));
        return null;
      })
      .finally(res => {
        if (!options.ignoreLoading) {
          store.dispatch(toggleLoading(false));
        }

        return res;
      });
  }

  appendToken = (headers) => {
    const token = store.getState().app.user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  parseResponse = res => res.status === 401 ? res.blob() : res.json()
    .then(data => ({
      status: res.status,
      ok: res.ok,
      data
    }))

  handleErrors = (res) => {
    if (!res.ok) {
      if (res.status === 401) {
        AsyncStorage.removeItem("UserToken");
        store.dispatch(saveUser(null, ''));
      }
      
      store.dispatch(showMessage(res.data.message, MessageType.Error));
      return null;
    }
    return res;
  }
}

const instance = new ApiCall();

export default instance.call;
