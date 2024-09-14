import { NextFunction, Request, Response } from 'express';
import accessService from '../services/access.service';
import { Created, Ok } from '../core/success.response';
import { MiddlewaresRequest, UserSignUpRequest, UserLoginRequest, UserLoginGoogleRequest } from '../core/type.request';
class AccessController {
  refreshToken = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'Refreshtoken success',
      metadata: await accessService.refreshToken({ keyStore: req.keyStore, user: req.user, refreshToken: req.refreshToken }),
    }).send(res);
  };
  logout = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'Logout success',
      metadata: await accessService.logout(req.keyStore._id),
    }).send(res);
  };
  login = async (req: Request<UserLoginRequest>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'new user success',
      metadata: await accessService.login(req.body),
    }).send(res);
  };
  loginGoogle = async (req: Request<any,any,UserLoginGoogleRequest>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'new user success',
      metadata: await accessService.loginWithGoogle(req.body.credential),
    }).send(res);
  };
  signUp = async (req: Request<UserSignUpRequest>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'Register success',
      metadata: await accessService.sginUp(req.body),
    }).send(res);
  };
}
export default new AccessController();
