const saltRounds = 10;

const handleRegister = (knex, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;

  let hashPwd = null;
  bcrypt.hash(password, saltRounds, (errHash, resHash) => {
    hashPwd = resHash;

    if (!hashPwd) return res.status(400).json('unable to hash password');

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
  });
};

module.exports = {
  handleRegister
};
