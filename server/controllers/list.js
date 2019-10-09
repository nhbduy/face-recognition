const handleList = knex => (req, res) => {
  return knex('users')
    .select()
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json(error));
};

module.exports = {
  handleList
};
