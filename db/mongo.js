require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const config = require("../config");
const uri = process.env.MONGOCLOUD_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("heroku-notes").collection("notes");

class MongoApi {
  static async getItems(query = null, options = null) {
    query = query ? query : {};
    options = options ? options : { sort: { date: config.sortBy.desc } };
    return await collection.find(query, options).toArray();
  }

  static async setItem(item) {
    return await collection.insertOne({ ...item, edits: [] });
  }

  static async deleteItem(id) {
    const query = { _id: ObjectId(id) };
    return await collection.deleteOne(query);
  }

  static async updateItem(id, item) {
    const { note, date } = item;
    const query = { _id: ObjectId(id) };
    const foundItem = await collection.findOne(query);
    console.log({foundItem});
    const changes = {
      $set: {
        note,
        date,
        edits: [
          ...foundItem.edits,
          { note: foundItem.note, date: foundItem.date },
        ],
      },
    };

    return await collection.updateOne(query, changes);
  }
}

module.exports = {
  MongoApi,
};
