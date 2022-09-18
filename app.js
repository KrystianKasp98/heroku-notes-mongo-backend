const express = require("express");
const {json, urlencoded} = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const store = new session.MemoryStore();

const config = require("./config");
const {MongoApi} = require("./db/mongo");
const {handleRequest, formatMongoQuery, checkIfWrongPropertyTypes, mapTypes, mapReceived} = require("./utils/index");

const app = express();
const mainPath = "/notes";
const login = "/login";

app.use(session({
  secret: "some secret",
  cookie: {maxAge: 30000},
  saveUninitialized: false,
  resave: true, // odnowienie tego samego session id
  store
}));
app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
// testing middleware for checking auth
// app.use((req, res, next) => {
//   console.log(store);
//   console.log(`${req.method} - ${req.url}`);
//   console.log({ user: req.session.user });
//   if (req.url.includes(mainPath)) {
//     if (req.session.authenticated) {
//       next();
//     } else {
//       res.status(403).json({message: "Authorization failed"});
//     }
//   } else {
//     next();
//   }
// });

// mainPath
app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));
app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));
app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));
app.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));
app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));

app.post(login, async (req, res) => {
  console.log(req.sessionID);
  const {login, password} = req.body;
  const result = await MongoApi.getUser(login, password);
  console.log({result});
  if (login && password) {
    if (req.session.authenticated) {
      res.status(200).json(req.session);
    } else {
      // auth success
      if (result) {
        req.session.authenticated = true;
        req.session.user = {
          login, password
        };
        res.status(200).json(req.session);
      } else {
        // auth failed
        res.status(403).json({message: "Bad credential"});
      }
    }
  } else {
    res.status(403).json({message: "Bad credential"});
  }
});

app.all("*", (req, res) => {
  res.status(404).json({message: config.message.badRequest});
});

const getAllItems = async (req, res) => {
  console.log("Cookies", req.cookies);
  const result = await MongoApi.getItems();
  res.json(result);
};

const getItems = async (req, res) => {
  let {query, options} = req.body; // options isn't required
  const expected = mapTypes(["query"]);
  const mappedReceived = mapReceived({query});
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).json({message: isWrongRequest});
  } else {
    query = formatMongoQuery(query);
    const result = await MongoApi.getItems(query, options);
    res.json({result});
  }
};

const addItem = async (req, res) => {
  const {date, note} = req.body;
  const expected = mapTypes(["note", "date"]);
  const mappedReceived = mapReceived({note, date});
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).json({message: isWrongRequest});
  } else {
    const result = await MongoApi.setItem({date, note: note ? note : ""});
    res.json({result, body: req.body});
  }
};

const updateItem = async (req, res) => {
  const {date, note, id} = req.body;
  const expected = mapTypes(["id", "note", "date"]);
  const mappedReceived = mapReceived({id, note, date});
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).json({message: isWrongRequest});
  } else {
    const result = await MongoApi.updateItem(id, {date, note});
    res.json({result, body: req.body});
  }
};

const deleteItem = async (req, res) => {
  const {id} = req.body;
  const expected = mapTypes(["id"]);
  const mappedReceived = mapReceived({id});
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).json({message: isWrongRequest});
  } else {
    const result = await MongoApi.deleteItem(id);
    res.status(400).json({result, id});
  }
};


module.exports = {app, mainPath};
