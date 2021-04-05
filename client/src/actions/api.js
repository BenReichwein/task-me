import axios from 'axios';

// This makes it so we can use shortened url with api calls
export default axios.create({
  baseURL: `https://taskme200.wl.r.appspot.com/api/`,
  withCredentials: true,
  mode: 'cors',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  }
});