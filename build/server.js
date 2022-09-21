/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst {\n  json,\n  urlencoded\n} = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n\nconst session = __webpack_require__(/*! express-session */ \"express-session\");\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst store = new session.MemoryStore();\n\nconst config = __webpack_require__(/*! ./config */ \"./config.js\");\n\nconst {\n  MongoApi\n} = __webpack_require__(/*! ./db/mongo */ \"./db/mongo.js\");\n\nconst {\n  handleRequest,\n  formatMongoQuery,\n  checkIfWrongPropertyTypes,\n  mapTypes,\n  mapReceived\n} = __webpack_require__(/*! ./utils/index */ \"./utils/index.js\");\n\nconst app = express();\nconst mainPath = \"/notes\";\nconst login = \"/login\";\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  cookie: {\n    maxAge: 30000\n  },\n  saveUninitialized: false,\n  resave: true,\n  store\n}));\napp.use(cors());\napp.use(json());\napp.use(urlencoded({\n  extended: true\n})); // testing middleware for checking auth, remove it for testing, but it works on heroku\n\nif (process.env.IS_HEROKU) {\n  app.use((req, res, next) => {\n    console.log(store);\n    console.log(`${req.method} - ${req.url}`);\n    console.log({\n      user: req.session.user\n    });\n\n    if (req.url.includes(mainPath)) {\n      if (req.session.authenticated) {\n        next();\n      } else {\n        res.status(403).json({\n          message: \"Authorization failed\"\n        });\n      }\n    } else {\n      next();\n    }\n  });\n} // mainPath\n\n\napp.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));\napp.post(mainPath, async (req, res) => handleRequest(req, res, getItems));\napp.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));\napp.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));\napp.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));\napp.post(login, async (req, res) => {\n  console.log(req.sessionID);\n  const {\n    login,\n    password\n  } = req.body;\n  const result = await MongoApi.getUser(login, password);\n  console.log({\n    result\n  });\n\n  if (login && password) {\n    if (req.session.authenticated) {\n      res.status(200).json(req.session);\n    } else {\n      // auth success\n      if (result) {\n        req.session.authenticated = true;\n        req.session.user = {\n          login,\n          password\n        };\n        res.status(200).json(req.session);\n      } else {\n        // auth failed\n        res.status(403).json({\n          message: \"Bad credential\"\n        });\n      }\n    }\n  } else {\n    res.status(403).json({\n      message: \"Bad credential\"\n    });\n  }\n});\napp.all(\"*\", (req, res) => {\n  res.status(404).json({\n    message: config.message.badRequest\n  });\n});\n\nconst getAllItems = async (req, res) => {\n  console.log(\"Cookies\", req.cookies);\n  const result = await MongoApi.getItems();\n  res.json(result);\n};\n\nconst getItems = async (req, res) => {\n  let {\n    query,\n    options\n  } = req.body; // options isn't required\n\n  const expected = mapTypes([\"query\"]);\n  const mappedReceived = mapReceived({\n    query\n  });\n  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);\n\n  if (isWrongRequest) {\n    res.status(400).json({\n      message: isWrongRequest\n    });\n  } else {\n    query = formatMongoQuery(query);\n    const result = await MongoApi.getItems(query, options);\n    res.json({\n      result\n    });\n  }\n};\n\nconst addItem = async (req, res) => {\n  const {\n    date,\n    note\n  } = req.body;\n  const expected = mapTypes([\"note\", \"date\"]);\n  const mappedReceived = mapReceived({\n    note,\n    date\n  });\n  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);\n\n  if (isWrongRequest) {\n    res.status(400).json({\n      message: isWrongRequest\n    });\n  } else {\n    const result = await MongoApi.setItem({\n      date,\n      note: note ? note : \"\"\n    });\n    res.json({\n      result,\n      body: req.body\n    });\n  }\n};\n\nconst updateItem = async (req, res) => {\n  const {\n    date,\n    note,\n    id\n  } = req.body;\n  const expected = mapTypes([\"id\", \"note\", \"date\"]);\n  const mappedReceived = mapReceived({\n    id,\n    note,\n    date\n  });\n  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);\n\n  if (isWrongRequest) {\n    res.status(400).json({\n      message: isWrongRequest\n    });\n  } else {\n    const result = await MongoApi.updateItem(id, {\n      date,\n      note\n    });\n    res.json({\n      result,\n      body: req.body\n    });\n  }\n};\n\nconst deleteItem = async (req, res) => {\n  const {\n    id\n  } = req.body;\n  const expected = mapTypes([\"id\"]);\n  const mappedReceived = mapReceived({\n    id\n  });\n  const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);\n\n  if (isWrongRequest) {\n    res.status(400).json({\n      message: isWrongRequest\n    });\n  } else {\n    const result = await MongoApi.deleteItem(id);\n    res.status(400).json({\n      result,\n      id\n    });\n  }\n};\n\nmodule.exports = {\n  app,\n  mainPath\n};\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./app.js?");

/***/ }),

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((module) => {

eval("module.exports = {\n  message: {\n    badRequest: \"bad request\",\n\n    /**\n     *\n     * @param {string} name property name\n     * @param {string} type correct property type, not passed\n     * @returns\n     */\n    badProperty: (name, type) => `You passed wrong property, ${name} must have ${type} type.`\n  },\n  sortBy: {\n    desc: -1,\n    asc: 1\n  },\n  mappedTypes: {\n    id: \"string\",\n    note: \"string\",\n    date: \"number\",\n    query: \"object\",\n    options: \"object\"\n  },\n  method: {\n    GET: \"get\",\n    POST: \"post\",\n    PUT: \"put\",\n    DELETE: \"delete\"\n  },\n  testsApi: [{\n    _id: \"6325ff55e79521788fd0f3d7\",\n    note: \"welcome in my app\",\n    date: 1663434665905,\n    edits: []\n  }, {\n    _id: \"6326080a6b6db35867d0fb32\",\n    note: \"Welcome\",\n    date: 222333,\n    edits: []\n  }, {\n    note: \"POST, PUT, DELETE\",\n    date: 222444333\n  }, {\n    note: \"new note POST, PUT, DELETE\",\n    date: 222444334\n  }],\n  testsUtils: {\n    basic: [{\n      date: 2000,\n      id: \"2333534534\",\n      note: \"Welcome\"\n    }, {\n      id: 2132423,\n      note: true,\n      date: 2142152363\n    }, {\n      note: \"correct note\",\n      id: \"correct id\"\n    }, {\n      id: \"2131\",\n      badProp: true,\n      date: true\n    }, [\"id\", \"note\", \"date\", \"name\"], {\n      id: \"2131\",\n      badProp: true,\n      date: null\n    }],\n    formated: [{\n      date: 2000,\n      id: \"2333534534\",\n      note: /^Welcome$/i\n    }, \"You passed wrong property, id must have string type. You passed wrong property, note must have string type.\", \"\", \"You passed wrong property, date must have number type.\", {\n      id: \"string\",\n      note: \"string\",\n      date: \"number\"\n    }, {\n      id: \"string\",\n      badProp: \"boolean\",\n      date: \"undefined\"\n    }]\n  }\n};\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./config.js?");

/***/ }),

/***/ "./db/mongo.js":
/*!*********************!*\
  !*** ./db/mongo.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst {\n  MongoClient,\n  ServerApiVersion,\n  ObjectId\n} = __webpack_require__(/*! mongodb */ \"mongodb\");\n\nconst config = __webpack_require__(/*! ../config */ \"./config.js\");\n\nconst uri = process.env.MONGOCLOUD_URL;\nconst dbName = process.env.MONGO_DB_NAME;\nconst client = new MongoClient(uri, {\n  useNewUrlParser: true,\n  useUnifiedTopology: true,\n  serverApi: ServerApiVersion.v1\n});\nconst notes = client.db(dbName).collection(\"notes\");\nconst auth = client.db(dbName).collection(\"auth\");\n\nclass MongoApi {\n  // NOTES\n\n  /**\r\n   *\r\n   * @param {query?: {note?: string, date?: number, id?: string } | null} query\r\n   * @param {{} | null} options sort, filter and similar conditions\r\n   * @returns {Array.<{_id: ObjectId, note: string, date: number, edits: Array.<{note: string, date: number}> | []}>}\r\n   */\n  static async getItems() {\n    let query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n    query = query ? query : {};\n    options = options ? options : {\n      sort: {\n        date: config.sortBy.desc\n      }\n    };\n    return await notes.find(query, options).toArray();\n  }\n  /**\r\n   *\r\n   * @param {{note: string, date: number}} item\r\n   * @returns {{acknowledged: boolean, insertedId: number}}\r\n   */\n\n\n  static async setItem(item) {\n    return await notes.insertOne({ ...item,\n      edits: []\n    });\n  }\n  /**\r\n   *\r\n   * @param {string} id\r\n   * @returns {{acknowledged: boolean, deletedCount: number}}\r\n   */\n\n\n  static async deleteItem(id) {\n    const query = {\n      _id: ObjectId(id)\n    };\n    return await notes.deleteOne(query);\n  }\n  /**\r\n   *\r\n   * @param {string} id\r\n   * @param {{note: string, date: number}} item\r\n   * @returns {{acknowledged: boolean, modifiedCount: number, upsertedId: null | string, upsertedCount: number, matchedCount: number}}\r\n   */\n\n\n  static async updateItem(id, item) {\n    const {\n      note,\n      date\n    } = item;\n    const query = {\n      _id: ObjectId(id)\n    };\n    const foundItem = await notes.findOne(query);\n    const changes = {\n      $set: {\n        note,\n        date,\n        edits: [{\n          note: foundItem.note,\n          date: foundItem.date\n        }, ...foundItem.edits]\n      }\n    };\n    return await notes.updateOne(query, changes);\n  } // AUTH\n\n  /**\r\n   *\r\n   * @returns {Array.<{username: string, password: string}> | []}\r\n   */\n\n\n  static async getUsers() {\n    return await auth.find().toArray();\n  }\n  /**\r\n   *\r\n   * @param {string} login\r\n   * @param {string} password\r\n   * @returns {{_id: ObjectId, login: string, password: string}}\r\n   */\n\n\n  static async getUser(login, password) {\n    const query = {\n      login,\n      password\n    };\n    return await auth.findOne(query);\n  }\n\n}\n\nmodule.exports = {\n  MongoApi\n};\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./db/mongo.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  app\n} = __webpack_require__(/*! ./app.js */ \"./app.js\");\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\napp.listen(process.env.PORT || 4000, function () {\n  if (process.env.PORT !== undefined) {\n    console.log(`App running on process.env.PORT     ${process.env.PORT}`);\n  } else {\n    console.log(\"App running on PORT 4000\");\n  }\n});\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./index.js?");

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const config = __webpack_require__(/*! ../config */ \"./config.js\");\n/**\n *\n * @param {Request} req\n * @param {Response} res\n * @param {function} callback function that handle endpoint when server works well\n * @returns\n */\n\n\nconst handleRequest = (req, res, callback) => {\n  try {\n    callback(req, res);\n  } catch (err) {\n    res.status(500).send(err);\n  }\n};\n/**\n * @info it formats string type properties for disable case sensitive\n * @param {{any}} query\n * @returns {{any}}\n */\n\n\nconst formatMongoQuery = query => {\n  // remove case sensitive\n  for (let key in query) {\n    if (typeof query[key] === \"string\" && key !== \"id\") {\n      query[key] = new RegExp([\"^\", query[key], \"$\"].join(\"\"), \"i\");\n    }\n  }\n\n  return query;\n}; // expected:{id:\"string\",note:\"string\",date:\"number\"}, received: {id:typeof id, note: typeof note, date: typeof date}\n\n/**\n * @info compare expected req.body props with received req.body props\n * @param {{id?: \"string\", note?: \"string\", date?: \"number\", query?: \"object\"}} expected\n * @param {{id?: string, note?: string, date?: string, query: string}} received\n * @returns {string} if types are correct it will return empty string(falsy value)\n */\n\n\nconst checkIfWrongPropertyTypes = (expected, received) => {\n  let message = \"\";\n\n  for (let key in expected) {\n    if (expected[key] !== received[key] || received[key] === undefined) {\n      message += `${config.message.badProperty(key, expected[key])} `;\n    }\n  }\n\n  return message === \"\" ? message : message.slice(0, -1);\n};\n/**\n * @info map array of props name to {propName: propType}\n * @param {[string]} properties\n * @returns {object}\n */\n\n\nconst mapTypes = properties => {\n  const mappedObject = {};\n  properties.forEach(prop => {\n    if (config.mappedTypes[prop]) {\n      mappedObject[prop] = config.mappedTypes[prop];\n    }\n  });\n  return mappedObject;\n};\n/**\n * @info it returns mapped object like {id: typeof id, note: typeof note...}\n * @param {{id?: any, note?: any, date?: any, query?: any, options?: any}} object\n * @returns {{id?: any, note?: any, date?: any, query?: any, options?: any}}\n */\n\n\nconst mapReceived = object => {\n  for (let key in object) {\n    object[key] = object[key] !== null ? typeof object[key] : \"undefined\";\n  }\n\n  return object;\n};\n\nmodule.exports = {\n  handleRequest,\n  formatMongoQuery,\n  checkIfWrongPropertyTypes,\n  mapTypes,\n  mapReceived\n};\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./utils/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-session");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;