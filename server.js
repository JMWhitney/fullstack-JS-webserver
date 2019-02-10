import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

//Set ejs to the template engine
server.set('view engine', 'ejs');


server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(( { initialMarkup, initialData } ) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send("Bad Request");
    });
});

//Using the express middleware this line is
server.use(express.static('public'));

//The same as this block of code.
// server.get('/about.html', (req, res) => {
//   fs.readFile('./public/about.html', (err, data) => {
//     res.send(data.toString());
//   });
// });

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
})