const handleRequest = (req, res, callback) => {
  try {
    callback(req, res);
  } catch (err) {
    return res.status(500).send(err);
  }
};

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

module.exports = { handleRequest, formatMongoQuery };
