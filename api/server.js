const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();

const UsersRouter = require("./users/users-router");

// const sessionConfiguration = {
//   name: "sessionToken",
//   secret: process.env.SECRET,
//   cookie: {
//     maxAge: 1000 * 60 * 120,
//     secure: false,
//     httpOnly: true,
//   },
//   resave: false,
//   saveUnititialized: false,
// };

server.use(express.json());
server.use(helmet());
server.use(cors());
// server.use(session(sessionConfiguration));

server.use("/users", UsersRouter);

module.exports = server;
