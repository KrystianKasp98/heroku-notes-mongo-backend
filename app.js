const express = require("express");
const { MongoApi } = require("./db/mongo");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const config = require("./config");
const { handleRequest, formatMongoQuery } = require("./utils/index");

const app = express();
const mainPath = "/notes"

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));
app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));
app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));
app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));


app.all("*", (req, res) => {
  res.status(404).send({ message: config.message.badRequest });
});

const getAllItems = async(req, res) => {
  const result = await MongoApi.getItems();
  res.send(result);
}

const getItems = async (req, res) => {
  let { query, options } = req.body;
  if (!query) {
    res.status(400).send({ message: config.message.badProperty("query", "object")});
  }
  query = formatMongoQuery(query);
  const result = await MongoApi.getItems(query, options);
  res.send({result});
}

const addItem = async (req, res) => {
  const { date, note } = req.body;
  if (typeof date !== "number") {
    res.status(400).send({ message: config.message.badProperty("date", "number") });
  }
  const result = await MongoApi.setItem({ date, note: note ? note : "" });
  res.send({ result, body: req.body });
}

const deleteItem = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).send({ message: config.message.badProperty("id", typeof id) });
  }
  const result = await MongoApi.deleteItem(id);
  res.send({ result, id });
}

module.exports = { app, mainPath };
