const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('spanishSpeaking').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('spanishSpeaking')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//POST
const createSpanishSpeaking = async (req, res, next) => {
//send a json body
  const spanishSpeaking = {
    countryName: req.body.countryName,
    flag: req.body.flag,
    capital: req.body.capital,
    population: req.body.population,
    percentNativeSpeakers: req.body.percentNativeSpeakers
  };
  const response = await mongodb.getDb().db().collection('spanishSpeaking').insertOne(spanishSpeaking);
  if (response.acknowledged) {
    res.status(204).json(response);
  }else{
    res.status(500).json(response.error || 'Error while creating spanish speaking info.');
  }
};

//PUT
const updateSpanishSpeaking = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const spanishSpeaking = {
    countryName: req.body.countryName,
    flag: req.body.flag,
    capital: req.body.capital,
    population: req.body.population,
    percentNativeSpeakers: req.body.percentNativeSpeakers
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('spanishSpeaking')
    .replaceOne({ _id: userId }, spanishSpeaking);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the spanish speaking info.');
  }
};

//DELETE
const deleteSpanishSpeaking = async (req, res, next) => {
  const userID = new ObjectId(req.params.id);
  //.remove did not work, instead used .deleteOne, but there is also .deleteMany to delete more than 1
  const response = await mongodb.getDb().db().collection('spanishSpeaking').deleteOne({ _id: userID }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }else{
    res.status(500).json(response.error || 'Error during deleting spanish speaking info.');
  }
};

module.exports = { 
  getAll, 
  getSingle,
  createSpanishSpeaking,
  updateSpanishSpeaking,
  deleteSpanishSpeaking
};