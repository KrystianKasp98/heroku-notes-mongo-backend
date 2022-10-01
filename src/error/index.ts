import { Request, Response } from "express";
import config from "../../config";

export default class ErrorHandler {

  static async handleRequest(req: Request,res: Response, callback) {
    try {
      callback(req, res);
    } catch(err) {
      res.status(500).send(`Server error ${err}`);
    }
  }

  static async handleErrorPath(req: Request, res: Response) {
    res.status(404).json({ message: config.message.badRequest });
  }
}
