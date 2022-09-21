const express = require("express");
const {json, urlencoded} = require("body-parser");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const store = new session.MemoryStore();
const config = require("./config");
const {MongoApi} = require("./db/mongo");
const {handleRequest} = require("./utils/index");
const {addItem, getAllItems, getItems, updateItem, deleteItem, handleLogIn} = require("./utils/routeMethods");


const app = express();
const mainPath = "/notes";
const loginPath = "/login";

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {maxAge: 30000},
  saveUninitialized: false,
  resave: true,
  store
}));
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

// testing middleware for checking auth, remove it for testing, but it works on heroku
if (process.env.IS_HEROKU) {
  app.use((req, res, next) => {
    if (req.url.includes(mainPath)) {
      if (req.session.authenticated) {
        next();
      } else {
        res.status(403).json({message: config.message.failedAuth});
      }
    } else {
      next();
    }
  });
}

// mainPath
app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));
app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));
app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));
app.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));
app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));

// loginPath
app.post(loginPath, async (req, res) => handleRequest(req, res, handleLogIn));

// errorPath
app.all("*", (req, res) => {
  res.status(404).json({message: config.message.badRequest});
});

module.exports = {app, mainPath};
