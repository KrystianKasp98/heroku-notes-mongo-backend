import express, { Request, Response, NextFunction } from "express";
import {json} from "body-parser";
import cors from "cors";
import session from "express-session";
import helmet from "helmet";
import ErrorHandler from "./error/index";

require("dotenv").config();

const store = new session.MemoryStore();
const config = require("../config");
const app = express();
const mainPath = "/notes";
const loginPath = "/login";



app.use(helmet());
// app.use(()=>session({
//   secret: process.env.SESSION_SECRET,
//   cookie: { maxAge: 30000 },
//   saveUninitialized: false,
//   resave: true,
//   store
// }));
app.use(cors());
app.use(json());

// testing middleware for checking auth, remove it for testing, but it works on heroku

// if (process.env.IS_HEROKU) {
//   app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.url.includes(mainPath)) {
//       const sessionData = req.session;
//       if (sessionData.authenticated) {
//         next();
//       } else {
//         res.status(403).json({message: config.message.failedAuth});
//       }
//     } else {
//       next();
//     }
//   });
// }

// // mainPath
// app.get(mainPath, async (req, res) => handleRequest(req, res, getAllItems));
// app.post(mainPath, async (req, res) => handleRequest(req, res, getItems));
// app.post(`${mainPath}/new`, async (req, res) => handleRequest(req, res, addItem));
// app.put(mainPath, async (req, res) => handleRequest(req, res, updateItem));
// app.delete(mainPath, async (req, res) => handleRequest(req, res, deleteItem));

// // loginPath
// app.post(loginPath, async (req, res) => handleRequest(req, res, handleLogIn));

// errorPath
app.all("/", ErrorHandler.handleErrorPath);

app.listen(process.env.PORT || 5000, function () {
  if (process.env.PORT !== undefined) {
    console.log(`App running on process.env.PORT ${process.env.PORT}`);
  } else {
    console.log("App running on PORT 5000");
  }
});

