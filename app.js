const express = require("express");
const { MongoApi } = require("./db/mongo");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");

const app = express();
const mainPath = "/notes"

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get(mainPath, async (req, res) => {
  try {
    const items = await MongoApi.getItems();
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ message: "bad request" });
});

module.exports = { app };
