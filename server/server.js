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

//-------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

//-------------------------------------------------
// / --> res = worked!!!
app.get('/', (req, res) => {
  res.send(database.users);
});

//-------------------------------------------------
// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  // bcrypt.compare(
  //   'tomfssa',
  //   '$2b$10$8TUr4yN1TXWMMVp3Of2khO.smXeu2rxBafwTLiXCPPox6X8POkV/S',
  //   (err, res) => {
  //     console.log('match', res);
  //   }
  // );

  const user = database.users.filter(
    item => item.email === req.body.email && item.password === req.body.password
  )[0];

  if (user) {
    res.status(200).json({ status: 200, message: 'ok', user });
  } else res.status(400).json({ status: 400, message: 'ko' });
});

//-------------------------------------------------
// /register --> POST = user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // bcrypt.hash(password, saltRounds, (err, hash) => {
  //   console.log(hash);
  // });

  database.users.push({
    id: database.users.length + 1,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  });

  const recentUser = database.users[database.users.length - 1];
  delete recentUser.password;

  res.json(recentUser);
});

//-------------------------------------------------
// /profile/:userId --> GET = user

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === Number(id)) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) res.status(400).json('no user existed');
});

//-------------------------------------------------
// /image --> PUT --> user
app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if (user.id === Number(id)) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) res.status(400).json('no user existed');
});

//-------------------------------------------------
app.listen(3000, () => {
  console.log('hellooooo port 3000');
});
