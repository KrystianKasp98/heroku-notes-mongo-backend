const {MongoApi} = require("../db/mongo");
const {formatMongoQuery, checkIfWrongPropertyTypes, mapTypes, mapReceived} = require("./index");

const getAllItems = async (req, res) => {
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

const handleLogIn = async (req, res) => {
  const {login, password} = req.body;
  const result = await MongoApi.getUser(login, password);
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
        res.status(403).json({message: config.message.badAuth});
      }
    }
  } else {
    res.status(403).json({message: config.message.badAuth});
  }
};

module.exports = {addItem, getAllItems, getItems, updateItem, deleteItem, handleLogIn};
