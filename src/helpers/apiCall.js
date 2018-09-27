import { apiUrl } from '../config';

export class ApiCall {
  defaultHeaders = new Headers({
    'Content-Type': 'application/json'
  })

  call = (url, requestSettings, options) => {
    options = options || {};
    requestSettings = requestSettings || {};
    const headers = requestSettings.headers || this.defaultHeaders;

    if (!options.ignoreLoading) {
      // this.store.commit('app/mToggleLoading', true);
    }

    this.appendToken(headers);

    return fetch(`${apiUrl}${url}`, {
      ...requestSettings,
      headers
    })
      .then(this.parseResponse)
      .then(this.handleErrors)
      .catch((err) => {
        // this.store.dispatch('app/showError', 'Something went wrong!');
        console.error(err);
        return null;
      })
      .finally(res => {
        if (!options.ignoreLoading) {
          // this.store.commit('app/mToggleLoading', false);
        }

        return res;
      });
  }

  appendToken = (headers) => {
    const token = null; // AsyncStorage.getItem('token'); // this.store.getters['app/getToken'];
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  parseResponse = res => res.json()
    .then(data => ({
      status: res.status,
      ok: res.ok,
      data
    }))

  handleErrors = (res) => {
    if (!res.ok) {
      // this.store.dispatch('app/showError', res.data.message);
      console.warn(res.data.message)
      return null;
    }
    return res;
  }
}

const instance = new ApiCall();

export default instance.call;
