import {  GetAllBlogByUserSlugRequest, UpdateProfileRequest } from '@/core/type.request';
import { Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import UserService from '@/services/user.service'
const usertest = [
  {
    name: '',
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
  profileBySlug = async (req: Request<{slug:string},any,any,{userId?:string}>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'success',
      metadata: await UserService.profileBySlug(req.params.slug, req.query.userId),
    }).send(res);
  };
  updateProfile = async (req: Request<{slug:string},any,UpdateProfileRequest,{userId?:string}>, res: Response, next: NextFunction)=>{
    return Ok.create({
      message: 'update success',
      metadata: await UserService.updateProfile(req.body),
    }).send(res);
  }
  // get for role user
  getAllPostsByUserSlug = async (req: Request<{slug:string},any,any,GetAllBlogByUserSlugRequest>, res: Response, next: NextFunction) => {
    if(req.query.postType && req.query.postType == "question"){
      return Ok.create({
        message: 'get questions success',
        metadata: await UserService.getAllQuestionBySlug({...req.query,slug:req.params.slug}),
      }).send(res);
    }
    return Ok.create({
      message: 'get blogs success',
      metadata: await UserService.getAllBlogBySlug({...req.query,slug:req.params.slug}),
    }).send(res);
  };
}
export default new ProfileController
