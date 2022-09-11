require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGOCLOUD_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("heroku-notes").collection("notes");

class MongoApi {
  static async getItems() {
    return await collection.find({}).toArray();
  }

  static async setItem(item) {
    return await collection.insertOne(item);
  }

  static async deleteItem(options) {
    try {
      const result = await collection.deleteOne(options);
      return !!result.deletedCount;
    } catch (err) {
      return false;
    }
  }
}

module.exports = {
  MongoApi,
};

