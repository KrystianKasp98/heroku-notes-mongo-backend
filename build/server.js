/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_4__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './error/index'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\r\n\r\nconst store = new (express_session__WEBPACK_IMPORTED_MODULE_3___default().MemoryStore)();\r\nconst config = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../config'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\r\nconst mainPath = \"/notes\";\r\nconst loginPath = \"/login\";\r\n\r\n\r\n\r\napp.use(helmet__WEBPACK_IMPORTED_MODULE_4___default()());\r\n// app.use(()=>session({\r\n//   secret: process.env.SESSION_SECRET,\r\n//   cookie: { maxAge: 30000 },\r\n//   saveUninitialized: false,\r\n//   resave: true,\r\n//   store\r\n// }));\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());\r\napp.use((0,body_parser__WEBPACK_IMPORTED_MODULE_1__.json)());\r\n\r\n// testing middleware for checking auth, remove it for testing, but it works on heroku\r\n\r\n// if (process.env.IS_HEROKU) {\r\n//   app.use((req: Request, res: Response, next: NextFunction) => {\r\n//     if (req.url.includes(mainPath)) {\r\n//       const sessionData = req.session;\r\n//       if (sessionData.authenticated) {\r\n//         next();\r\n//       } else {\r\n//         res.status(403).json({message: config.message.failedAuth});\r\n//       }\r\n//     } else {\r\n//       next();\r\n//     }\r\n//   });\r\n// }\r\n\r\n// // mainPath\r\n// app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));\r\n// app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));\r\n// app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));\r\n// app.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));\r\n// app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));\r\n\r\n// // loginPath\r\n// app.post(loginPath, async (req, res) => handleRequest(req, res, handleLogIn));\r\n\r\n// errorPath\r\napp.all(\"/\", Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './error/index'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\r\n\r\napp.listen(process.env.PORT || 5000, function () {\r\n  if (process.env.PORT !== undefined) {\r\n    console.log(`App running on process.env.PORT ${process.env.PORT}`);\r\n  } else {\r\n    console.log(\"App running on PORT 5000\");\r\n  }\r\n});\r\n\r\n\n\n//# sourceURL=webpack://heroku-notes-mongo-backend/./src/app.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;