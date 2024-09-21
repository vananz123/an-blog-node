import { Ok } from '@/core/success.response';
import { DeleteBlogRequest, GetAllBlogByUserIdRequest, GetAllPostBookmarksByUserIdRequest } from '@/core/type.request';
import UserService from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

export type FollowRequest = {
    userId: string;
    userIdFollow: string;
};
class MeController {
  follow = async (req: Request<any, any, FollowRequest, any>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'follow',
      metadata: await UserService.follow(req.body),
    }).send(res);
  };
  bookmarkBlog = async (req: Request<any, any, DeleteBlogRequest, any>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'bookmart blog success',
      metadata: await UserService.bookmarkBlog(req.body),
    }).send(res);
  };
  bookmarkQuestion = async (req: Request<any, any, { userId: string; questionId: string }, any>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'bookmart question success',
      metadata: await UserService.bookmarkQuestion(req.body),
    }).send(res);
  };
  getAllPosts = async (req: Request<any,any,any,GetAllPostBookmarksByUserIdRequest>, res: Response, next: NextFunction) => {
    if(req.query.postType && req.query.postType == "question"){
      return Ok.create({
        message: 'get questions success',
        metadata: await UserService.getAllQuestion({...req.query}),
      }).send(res);
    }
    return Ok.create({
      message: 'get blogs success',
      metadata: await UserService.getAllBlog({...req.query}),
    }).send(res);
  };
  getAllBookmarkPostForUser = async(req: Request<any, any, any, GetAllPostBookmarksByUserIdRequest>, res: Response, next: NextFunction)=>{
    if(req.query.postType && req.query.postType =="question"){
      return Ok.create({
        message: 'get all bookmark question success',
        metadata: await UserService.getAllQuestionBookmark(req.query),
      }).send(res);
    }
    return Ok.create({
      message: 'get all bookmark blog success',
      metadata: await UserService.getAllBlogBookmark(req.query),
    }).send(res);
  }
}
export default new MeController();
