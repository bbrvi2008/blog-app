import RealWorldApiService from './RealWorldApiService';

export default class UserApiService {
  constructor() {
    this.realworldApi = new RealWorldApiService();
    this.authentication = this.saveToken(this.authentication);
  }

  registration = (user) => {
    return this.realworldApi.postResource('/users', { user });
  }

  authentication = (user) => {
    return this.realworldApi.postResource('/users/login', { user });
  }

  updateUser = (user) => {
    return this.realworldApi.putResourceAuth('/user', { user });
  }

  saveToken = (authenticationRequsest) => {
    return async user => {
      const authenticationResponse = await authenticationRequsest(user);

      const { user: userResponse } = authenticationResponse.data;
      const { token } = userResponse;
      this.realworldApi.jwt = token;

      return authenticationResponse;
    }
  }
}