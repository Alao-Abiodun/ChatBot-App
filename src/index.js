// importing the express package to serve the express application
const express = require('express');

// import the dotenv package to hide some important links
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

// declaring variable PORT to store
// the port number to serve in the browser
const PORT = process.env.PORT || 2020;

// setting up an instance of express and
// stored in the variable name app
const app = express();

// using the express in order for it to be able to
// recieve request in JSON format from the server
app.use(express.json());

// serving up public directory using the express
app.use(express.static(path.join(__dirname, '../public')));

// the instance app listen to the PORT to serve in the browser
app.listen(PORT, () => {
  console.log(`The express is running on PORT ${PORT}`);
});
