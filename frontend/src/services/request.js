function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response.json();
  }
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
export function request(url, options) {
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .catch(err => {
        if (err.message === 'Failed to fetch') {
          throw new Error('internet connection issue');
        }
        throw err;
      });
  }
  export default request;