require("dotenv").config();
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const config = require("../config");
const uri = process.env.MONGOCLOUD_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("heroku-notes").collection("notes");

class MongoApi {
  /**
   *
   * @param {query?: {note?: string, date?: number, id?: string } | null} query
   * @param {{} | null} options sort, filter and similar conditions
   * @returns {Response}
   */
  static async getItems(query = null, options = null) {
    query = query ? query : {};
    options = options ? options : {sort: {date: config.sortBy.desc}};
    return await collection.find(query, options).toArray();
  }
  /**
   *
   * @param {{note: string, date: number}} item
   * @returns {Response}
   */
  static async setItem(item) {
    return await collection.insertOne({...item, edits: []});
  }
  /**
   *
   * @param {string} id
   * @returns {Response}
   */
  static async deleteItem(id) {
    const query = {_id: ObjectId(id)};
    return await collection.deleteOne(query);
  }
  /**
   *
   * @param {string} id
   * @param {{note: string, date: number}} item
   * @returns
   */
  static async updateItem(id, item) {
    const {note, date} = item;
    const query = {_id: ObjectId(id)};
    const foundItem = await collection.findOne(query);
    const changes = {
      $set: {
        note,
        date,
        edits: []
      },
    };

    return await collection.updateOne(query, changes);
  }
}

module.exports = {
  MongoApi,
};
