const database = {
  users: [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      password: 'john',
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'sally',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: 1,
      hash: '',
      email: 'john@gmail.com'
    },
    {
      id: 2,
      hash: '',
      email: 'sally@gmail.com'
    }
  ]
};

const dbConnection = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'face-recognition'
  }
};

//-------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')(dbConnection);

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// knex.select().from('users').then(data => {
//   console.log(data);
// });

//-------------------------------------------------
// / --> res = worked!!!
app.get('/', (req, res) => {
  return knex('users')
    .select()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(error));
});

//-------------------------------------------------
// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  return knex('login')
    .where({
      email
    })
    .select('hash', 'email')
    .then(response => {
      bcrypt.compare(password, response[0].hash, (errHash, resHash) => {
        if (resHash) {
          return knex('users')
            .where({ email })
            .select()
            .then(user =>
              res
                .status(200)
                .json({ status: 200, message: 'ok', user: user[0] })
            )
            .catch(err => res.status(400).json({ status: 400, message: 'ko' }));
        } else {
          return res.status(400).json({ status: 400, message: 'ko' });
        }
      });
    })
    .catch(error => res.status(400).json({ status: 400, message: 'ko' }));
});

//-------------------------------------------------
// /register --> POST = user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  let hashPwd = null;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    hashPwd = hash;

    if (!hashPwd) return res.status(400).json('unable to hash password');
    else {
      return knex
        .transaction(trx => {
          trx('login')
            .insert({
              hash: hashPwd,
              email
            })
            .returning('email')
            .then(loginEmail => {
              return trx('users')
                .insert({
                  name,
                  email: loginEmail[0],
                  joined: new Date()
                })
                .returning('*')
                .then(response => res.status(200).json(response[0]));
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(error => res.status(400).json('unable to register'));
    }
  });
});

//-------------------------------------------------
// /profile/:userId --> GET = user

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  return knex('users')
    .where({ id })
    .select()
    .then(response => {
      response.length
        ? res.status(200).json(response[0])
        : res.status(400).json('no user existed');
    })
    .catch(error => res.status(400).json('error getting user'));
});

//-------------------------------------------------
// /image --> PUT --> user
app.put('/image', (req, res) => {
  const { id } = req.body;

  return knex('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(response => res.status(200).json(response[0]))
    .catch(error => res.status(400).json('error getting entries'));
});

//-------------------------------------------------
app.listen(3000, () => {
  console.log('hellooooo port 3000');
});
