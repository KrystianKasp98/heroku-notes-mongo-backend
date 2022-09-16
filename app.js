const express = require("express");
const { MongoApi } = require("./db/mongo");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const config = require("./config");
const { handleRequest, formatMongoQuery, checkIfWrongPropertyTypes, mapTypes, mapReceived } = require("./utils/index");

const app = express();
const mainPath = "/notes"

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));
app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));
app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));
app.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));
app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));

app.all("*", (req, res) => {
  res.status(404).send({ message: config.message.badRequest });
});

const getAllItems = async(req, res) => {
  const result = await MongoApi.getItems();
  res.send(result);
}

const getItems = async (req, res) => {
  let { query, options } = req.body; // options isn't required
  const expected = mapTypes(["query"]);
  const mappedReceived = mapReceived({ query });
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).send({ message: isWrongRequest });
  }
  query = formatMongoQuery(query);
  const result = await MongoApi.getItems(query, options);
  res.send({result});
}

const addItem = async (req, res) => {
  const { date, note } = req.body;
  const expected = mapTypes(["note", "date"]);
  const mappedReceived = mapReceived({ note, date });
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).send({ message: isWrongRequest });
  }
  const result = await MongoApi.setItem({ date, note: note ? note : "" });
  res.send({ result, body: req.body });
}

const updateItem = async (req, res) => {
  const { date, note, id } = req.body;
  const expected = mapTypes(["id", "note", "date"]);
  const mappedReceived = mapReceived({ id, note, date });
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).send({ message: isWrongRequest });
  }
  const result = await MongoApi.updateItem(id, { date, note });
  res.send({ result, body: req.body });
}

const deleteItem = async (req, res) => {
  const { id } = req.body;
  const expected = mapTypes(["id"]);
  const mappedReceived = mapReceived({id});
  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

  if (isWrongRequest) {
    res.status(400).send({ message: isWrongRequest });
  } else {
    const result = await MongoApi.deleteItem(id);
    res.status(400).send({ result, id });
  }
}

module.exports = { app, mainPath };
