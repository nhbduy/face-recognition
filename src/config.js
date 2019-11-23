const MODE = 1; // 1-DEV, 2-PROD

const SERVER_URL_DEV = 'http://localhost:5000';

const SERVER_URL_PROD = 'https://nhbduy-face-recognition-server.herokuapp.com';

const SERVER_URL = MODE === 2 ? SERVER_URL_PROD : SERVER_URL_DEV;

export default SERVER_URL;
