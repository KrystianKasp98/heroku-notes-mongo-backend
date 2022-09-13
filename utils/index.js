const config = require("../config");

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {function} callback function that handle endpoint when server works well
 * @returns 
 */
const handleRequest = (req, res, callback) => {
  try {
    callback(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
};

/**
 * @info it formats string type properties for disable case sensitive
 * @param {{any}} query 
 * @returns {{any}}
 */
const formatMongoQuery = (query) => {
  // remove case sensitive
  for (let key in query) {
    if (typeof key === "string") {
      console.log(key);
      query[key] = new RegExp(["^", query[key], "$"].join(""), "i");
    }
  }
  return query;
};
//expected:{id:"string",note:"string",date:"number"}, received: {id:typeof id, note: typeof note, date: typeof date}
/**
 * @info compare expected req.body props with received req.body props 
 * @param {{id?: "string", note?: "string", date?: "number", query?: "object"}} expected 
 * @param {{id?: string, note?: string, date?: string, query: string}} received
 * @returns {string} if types are correct it will return empty string(falsy value)
 */
const checkIfWrongPropertyTypes = (expected, received) => {
  let message = "";
  for (let key in expected) {
    if (expected[key] !== received[key]) {
      message += config.message.badProperty(key, expected[key]);
    }
  }
  return message;

}

/**
 * @info map array of props name to {propName: propType}
 * @param {[string]} properties 
 * @returns {object}
 */
const mapTypes = (properties) => {
  const mappedObject = {};
  properties.forEach(prop => {
    mappedObject[prop] = config.mappedTypes[prop];
  });

  return mappedObject;
}

module.exports = { handleRequest, formatMongoQuery, checkIfWrongPropertyTypes, mapTypes };
