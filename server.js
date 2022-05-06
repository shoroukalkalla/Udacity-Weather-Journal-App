// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Require Cors:
const cors = require("cors");

// Require Body-Parser
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Initialize all route with a callback function
app.get("/all", getData);
app.post("/addWeatherInfo", addWeatherInfo);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
}

// Post Route
function addWeatherInfo(req, res) {
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };

  projectData = newEntry;
  res.send(projectData);
}

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${3000}`);
});
