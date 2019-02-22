import React from 'react';
import ReactDOM from 'react-DOM';

import App from './components/App'

//Render the information stored in the window global variable
//The window contest data is sent to the client by the server
//through the ejs templates.
//In this instance the data will be passed to React to re-render,
//But the server will have already sent a DOM that is identical to the virtual-DOM
//React will try to render, and react will do nothing.
ReactDOM.hydrate(
  <App initialData={window.initialData} />,
  document.getElementById('root')
);


