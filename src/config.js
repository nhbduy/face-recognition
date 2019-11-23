const MODE = 2; // 1-DEV, 2-PROD

const SERVER_URL_DEV = 'http://localhost:5000';

const SERVER_URL_PROD = 'https://nhbduy-face-recognition-server.herokuapp.com';

export default {
  SERVER_URL: MODE === 1 ? SERVER_URL_DEV : SERVER_URL_PROD
};
