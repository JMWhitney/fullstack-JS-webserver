import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

//Connect to mongodb
let db;
MongoClient.connect(config.mongodbUri, { useNewUrlParser: true }, (err, client) => {
  assert.equal(null, err);
  console.log("Connected to Mongodb");

  db = client.db('test');
});

const router = express.Router();

router.get('/contests', (req, res) => {

  let contests = {};
  //Query the database for all contests
  db.collection('contests')
  .find({})
  .project({
    //Return only id, categoryName, and contestName values
    id: true,
    categoryName: true,
    contestName: true
  })
  .toArray((err, documents) => {
    //Construct an object from the returned data and send it
    assert.equal(null, err);
    documents.forEach((contest) => {
      contests[contest.id] = contest;
    })
    //response must be sent here because nodejs queries the database asynchronously.
    res.send({ contests });
  });

});

router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(Number);
  let names = {};
  //Query the database for all contests
  db.collection('names')
  .find({ id: {$in: nameIds }})
  .toArray((err, documents) => {
    //Construct an object from the returned data and send it
    assert.equal(null, err);
    documents.forEach((name) => {
      names[name.id] = name;
    })
    //response must be sent here because nodejs queries the database asynchronously.
    res.send({ names });
  });

});

router.get('/contests/:contestId', (req, res) => {
  db.collection('contests')
  .findOne({ id: Number(req.params.contestId) })
  .then(contest => res.send(contest))
  .catch(console.error);
});

export default router;