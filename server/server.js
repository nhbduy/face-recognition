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

const app = express();
app.use(bodyParser.json());

//-------------------------------------------------
// / --> res = worked!!!
app.get('/', (req, res) => {
  res.send(database.users);
});

//-------------------------------------------------
// /signin --> POST = success/fail
app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  )
    res.json('logged in!!!');
  else res.status(400).json('error logging in');
});

//-------------------------------------------------
// /register --> POST = user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  database.users.push({
    id: database.users.length + 1,
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length - 1]);
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
