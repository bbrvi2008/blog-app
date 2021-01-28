export default class BaseApiService {
  async fetchResource(url, params = {}, options = {}) {
    if(!this.baseUrl) {
      throw new Error(`baseUrl is empty! Required override in class.`)
    }

    const queryParams = Object.entries(params).map(param => param.join('=')).join('&');

    const response = await fetch(`${this.baseUrl}${url}?${queryParams}`, options);
    if(!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    return response.json();
  }

  getResource(url, inputParams) {
    return this.fetchResource(url, inputParams);
  }

  postResource(url, data, inputParams) {
    return this.fetchResource(url, inputParams, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
  }
};