const Sauce = require('../models/Sauce.js');


exports.getAll = (req, res, next) => {
Sauce.find()
    .then(Sauces => {
      res.status(200).json({products:Sauces});
      console.log('GET request successful');
    })
    .catch(error => {
      res.status(400).json({ error });
      console.log('GET request failed. Error:', error);
    });
};

exports.getOne = (req, res, next) => {
Sauce.findOne({ _id: req.params.id })
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('GET:id request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('GET request failed. Error:', error);
  });
};

exports.create = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
  .then(Sauce => {
    res.status(200).json({product:Sauce});
    console.log('POST request successful');
  })
  .catch(error => {
    res.status(404).json({ error });
    console.log('POST request failed. Error:', error);
  });
};

exports.modify = (req, res, next) => {
Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => {
    res.status(200).json({ product: req.body});
    console.log('PUT request successful');
  })
  .catch(error => {
    res.status(400).json({ error });
    console.log('PUT request failed. Error:', error);
  });
};

exports.delete = (req, res, next) => {
Sauce.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({ message: 'Objet supprimé !'})
    console.log('DELETE request successful');
})
  .catch(error => {
    res.status(400).json({ error })});
    console.log('DELETE request failed. Error:', error);
};