const handleSignIn = (knex, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json('incorrect form submission');

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
            .catch(error =>
              res.status(400).json({ status: 400, message: 'ko' })
            );
        }
        return res.status(400).json({ status: 400, message: 'ko' });
      });
    })
    .catch(error => res.status(400).json({ status: 400, message: 'ko' }));
};

module.exports = {
  handleSignIn
};
