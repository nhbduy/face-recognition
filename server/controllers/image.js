const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd7dcd0f9a66d407597e4780e5e2f3f3d'
});

const handleImageUrl = (req, res) => {
  const { input } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json('unable to work with API'));
};

const handleImage = knex => (req, res) => {
  const { id } = req.body;

  return knex('users')
    .where({ id })
    .increment('entries', 1)
    .returning('entries')
    .then(response => res.status(200).json(response[0]))
    .catch(error => res.status(400).json('error getting entries'));
};

module.exports = {
  handleImageUrl,
  handleImage
};
