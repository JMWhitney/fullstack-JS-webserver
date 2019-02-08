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
  //Nodejs retrieves the data asynchronously 
  db.collection('contests').find({})
    .forEach((err, contest) => {
      assert.equal(null, err);
      console.log(contest);

      
      if(!contest) { //No more contests
        res.send(contests);
        return;
      }

      //Add each contest to contests array
      contests[contest.id] = contest;
     });
});

router.get('/contests/:contestId', (req, res) => {

});

export default router;