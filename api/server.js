const express = require("express");
//front end will have errors if cors is not imported
const cors = require("cors");
const server = express();

// this tells our app to accept json objects
server.use(express.json);
server.use(cors());

module.exports = server;
