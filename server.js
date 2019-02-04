import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

//Set ejs to the template engine
server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get('/', (req, res) => {
  serverRender()
    .then(( { initialMarkup, initialData } ) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(console.error);
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