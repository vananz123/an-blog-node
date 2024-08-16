import { Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
const usertest = [
  {
    name: 'sdfdsf',
  },
  {
    name: 'sdfdsf111',
  },
  {
    name: 'sdfdsf222',
  },
];
class ProfileController {
  profiles = async (req: Request, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'success',
      metadata: usertest,
    }).send(res);
  };
  profile = async (req: Request, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'success',
      metadata: {
        name: 'sdfdsf222',
      },
    }).send(res);
  };
}
export default new ProfileController
