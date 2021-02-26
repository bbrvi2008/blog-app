import BaseApiService from './BaseApiService';
import StorageValue from 'helpers/StorageValue';

const userStorable = new StorageValue("userData");

export default class RealWorldApiService extends BaseApiService {
  baseUrl = 'https://conduit.productionready.io/api';

  fetchResourceAuth = (url, params, options = {}) => {
    const user = userStorable.getValue();

    if(user == null) {
      throw new Error('RealWorldApiService user is null');
    }

    const { token } = user;
    return this.fetchResource(url, params, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Token ${token}`
      }
    });
  }

  getResourceAuthOrAnon = (url, params) => {
    const user = userStorable.getValue();
    if(user != null) {
      return this.fetchResourceAuth(url, params);
    }
    
    return this.getResource(url, params);
  }

  putResourceAuth = (url, data, params) => {
    return this.fetchResourceAuth(url, params, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  postResourceAuth = (url, data, params) => {
    return this.fetchResourceAuth(url, params, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  deleteResourceAuth = (url, params) => {
    return this.fetchResourceAuth(url, params, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

