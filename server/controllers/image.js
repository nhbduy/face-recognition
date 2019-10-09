const handleImage = (req, res, knex) => {
  const { id } = req.body;

  return knex('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(response => res.status(200).json(response[0]))
    .catch(error => res.status(400).json('error getting entries'));
};

module.exports = {
  handleImage
};
