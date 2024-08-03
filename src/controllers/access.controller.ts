import { NextFunction, Request, Response } from "express";
import accessService from "../services/access.service";
class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(201).json(accessService.sginUp(req.body))
    } catch (error) {}
  };
}
module.exports = new AccessController();