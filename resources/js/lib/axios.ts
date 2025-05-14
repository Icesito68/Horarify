import axios from 'axios';

axios.defaults.withCredentials = true;

const csrfToken = document.cookie
  .split('; ')
  .find(row => row.startsWith('XSRF-TOKEN='))
  ?.split('=')[1];

if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = decodeURIComponent(csrfToken);
}

export default axios;
