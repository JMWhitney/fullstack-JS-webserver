import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';
import validName from './validationBackEnd';

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
    categoryName: true,
    contestName: true
  })
  .toArray((err, documents) => {
    //Construct an object from the returned data and send it
    assert.equal(null, err);
    documents.forEach((contest) => {
      contests[contest._id] = contest;
    })
    //response must be sent here because nodejs queries the database asynchronously.
    res.send({ contests });
  });

});

router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(ObjectID);
  let names = {};
  //Query the database for all contests
  db.collection('names')
  .find({ _id: {$in: nameIds }})
  .toArray((err, documents) => {
    //Construct an object from the returned data and send it
    assert.equal(null, err);
    documents.forEach((name) => {
      names[name._id] = name;
    })
    //response must be sent here because nodejs queries the database asynchronously.
    res.send({ names });
  });

});

router.get('/contests/:contestId', (req, res) => {
  db.collection('contests')
  .findOne({ _id: ObjectID(req.params.contestId) })
  .then(contest => res.send(contest))
  .catch(error => {
    console.error(error);
    res.status(404).send("Bad Request");
  });
});

router.post('/names', (req, res) => {
  const contestId = ObjectID(req.body.contestId);
  const name = req.body.newName;

  if(validName(name)) {
    db.collection('names').insertOne({ name }).then(result => 
      db.collection('contests').findAndModify(
        { _id: contestId },
        [],
        { $push: { nameIds: result.insertedId } },
        { new: true }
      ).then(doc => 
        res.send({
          updatedContest: doc.value,
          newName: { _id: result.insertedId, name }
        })
      )
    )
    .catch(error => {
      console.error(error);
      res.status(404).send("Bad Request");
    });
  } else {
    console.log("Invalid name");
  }
})

router.put('/contests/:id', (request, response) => {

})

router.delete('/contests/:id', (request, response) => {
  
})

export default router;