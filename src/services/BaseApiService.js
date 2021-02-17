export default class BaseApiService {
  async fetchResource(resource, params = {}, options = {}) {
    if(!this.baseUrl) {
      throw new Error(`baseUrl is empty! Required override in class.`)
    }

    const queryParams = Object.entries(params).map(param => param.join('=')).join('&');


    let url = `${this.baseUrl}${resource}`;
    if(queryParams.length) {
      url += `?${queryParams}`
    }
    const response = await fetch(url, options);
    
    let processedErrors = [422];
    if(!response.ok && processedErrors.every(errorCode => errorCode !== response.status)) {
      throw new Error(`Could not fetch ${resource}, received ${response.status}`)
    }

    const data = await response.json()
    return {
      success: response.ok,
      data
    };
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
    });
  }
};