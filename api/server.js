const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const server = express();

const UsersRouter = require("./users/users-router");
const AuthRouter = require("./auth/auth-router");
const LoginRouter = require("./auth/login-router");
const IngredientsRouter = require("./ingredients/ingredients-router");
const RecipesRouter = require("./recipes/recipes-router");
const StepsRouter = require("./steps/steps-router");

const sessionConfiguration = {
  name: "sessionToken",
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 120,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUnititialized: true,
};

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfiguration));

server.use("/users", UsersRouter);
server.use("/signup", AuthRouter);
server.use("/login", LoginRouter);
server.use("/ingredients", IngredientsRouter);
server.use("/recipes", RecipesRouter);
server.use("/steps", StepsRouter);

module.exports = server;
