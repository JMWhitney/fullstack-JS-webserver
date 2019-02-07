import express from 'express';
import data from '../src/testData';

const router = express.Router();

//We want to return an object instead of an array.
//That way we have constant time lookups on the data.
const contestsObj = data.contests.reduce((obj, contest) => {
  obj[contest.id] = contest;
  return obj;
}, {})

router.get('/contests', (req, res) => {
  res.send({ 
    contests: contestsObj
  });
});

router.get('/contests/:contestId', (req, res) => {
  let contest = contestsObj[req.params.contestId];
  contest.description = 'Lorem ipsum dolor sit amet'

  res.send(contest);
});

export default router;