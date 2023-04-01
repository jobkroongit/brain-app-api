const Clarifai = require('clarifai');

// Clarifai api
const app = new Clarifai.App({
   apiKey: '6e54edb1b447454a84ba3cc51c8e0a46'
  });

const handleApiCall = (req, res) => {
   app.models
      .predict(
    {
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    }, req.body.input)
   .then(data => {
      res.json(data);
   })
   .catch(err => res.status(400).json('unable to connect with API'))
}
const handleImage = (req, res, db) => {
   const { id } = req.body;
      db('users').where('id', '=', id)
      .increment('entries', 1)
      .returing('entries')
      .then(entries => {
         res.json(entries[0].entries);
      })
      .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
   handleImage,
   handleApiCall
};