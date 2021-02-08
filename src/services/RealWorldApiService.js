import BaseApiService from './BaseApiService';
import StorageValue from '../helpers/StorageValue';

const userStorable = new StorageValue("userData");

export default class RealWorldApiService extends BaseApiService {
  baseUrl = 'https://conduit.productionready.io/api';

  fetchResourceAuth = (url, params, options = {}) => {
    const { token } = userStorable.getValue();

    if(token == null) {
      throw new Error('RealWorldApiService jwn is null');
    }

    return this.fetchResource(url, params, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Token ${token}`
      }
    });
  }

  putResourceAuth = (url, data, params) => {
    return this.fetchResourceAuth(url, params, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
  }
}

