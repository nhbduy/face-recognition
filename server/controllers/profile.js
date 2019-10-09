const handleProfile = (req, res, knex) => {
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
};

module.exports = {
  handleProfile
};
