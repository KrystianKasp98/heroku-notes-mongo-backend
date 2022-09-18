require("dotenv").config();
const {MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const config = require("../config");
const uri = process.env.MONGOCLOUD_URL;
const dbName = process.env.MONGO_DB_NAME;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const notes = client.db(dbName).collection("notes");
const auth = client.db(dbName).collection("auth");

class MongoApi {
  // NOTES
  /**
   *
   * @param {query?: {note?: string, date?: number, id?: string } | null} query
   * @param {{} | null} options sort, filter and similar conditions
   * @returns {Array.<{_id: ObjectId, note: string, date: number, edits: Array.<{note: string, date: number}> | []}>}
   */
  static async getItems(query = null, options = null) {
    query = query ? query : {};
    options = options ? options : {sort: {date: config.sortBy.desc}};

    return await notes.find(query, options).toArray();
  }
  /**
   *
   * @param {{note: string, date: number}} item
   * @returns {{acknowledged: boolean, insertedId: number}}
   */
  static async setItem(item) {
    return await notes.insertOne({...item, edits: []});
  }
  /**
   *
   * @param {string} id
   * @returns {{acknowledged: boolean, deletedCount: number}}
   */
  static async deleteItem(id) {
    const query = {_id: ObjectId(id)};

    return await notes.deleteOne(query);
  }
  /**
   *
   * @param {string} id
   * @param {{note: string, date: number}} item
   * @returns {{acknowledged: boolean, modifiedCount: number, upsertedId: null | string, upsertedCount: number, matchedCount: number}}
   */
  static async updateItem(id, item) {
    const {note, date} = item;
    const query = {_id: ObjectId(id)};
    const foundItem = await notes.findOne(query);
    const changes = {
      $set: {
        note,
        date,
        edits: [{note: foundItem.note, date: foundItem.date}, ...foundItem.edits],
      },
    };

    return await notes.updateOne(query, changes);
  }
  // AUTH
  /**
   *
   * @returns {Array.<{username: string, password: string}> | []}
   */
  static async getUsers() {
    return await auth.find().toArray();
  }
  /**
   *
   * @param {string} login
   * @param {string} password
   * @returns {{_id: ObjectId, login: string, password: string}}
   */
  static async getUser(login, password) {
    const query = {login, password};
    return await auth.findOne(query);
  }
}

module.exports = {
  MongoApi,
};
