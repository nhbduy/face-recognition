const DB_CONNECTION = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'face-recognition'
  }
};

const SERVER_PORT = 3000;

//-------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')(DB_CONNECTION);
const bcrypt = require('bcrypt');

const list = require('./controllers/list');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//-------------------------------------------------
const app = express();
app.use(bodyParser.json());
app.use(cors());

//-------------------------------------------------
// / --> res = user list
app.get('/', (req, res) => list.handleList(req, res, knex));

//-------------------------------------------------
// /signin --> POST = success/fail
app.post('/signin', (req, res) => signin.handleSignIn(req, res, knex, bcrypt));

//-------------------------------------------------
// /register --> POST = user
app.post('/register', (req, res) => register.handleRegister(req, res, knex, bcrypt));

//-------------------------------------------------
// /profile/:userId --> GET = user
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, knex));

//-------------------------------------------------
// /image --> PUT --> user
app.put('/image', (req, res) => image.handleImage(req, res, knex));

//-------------------------------------------------
app.listen(SERVER_PORT, () => {
  console.log('Welcome to FACE-RECOGNITION SERVER');
});
