
import { Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import UserService from '@/services/user.service'
import { GetAllAuthorsRequest } from '@/core/type.request';
class AuthorController {
  authors = async (req: Request<any,any,any,GetAllAuthorsRequest>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'get authors success',
      metadata: await UserService.authors(req.query),
    }).send(res);
  };
}
export default new AuthorController
