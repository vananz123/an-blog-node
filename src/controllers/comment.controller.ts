import { Created, Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import CommentService from '../services/comment.service';
import { DeleteCommentRequest, GetCommentRequest, MiddlewaresRequest, UpdateCommentRequest } from '../core/type.request';
import CommentQuestionService from '@/services/commentQuestion.service';

class CommentController {
  createComment = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    if(req.query.type == 'question'){
      return Ok.create({
        message: 'create comment question success',
        metadata: await CommentQuestionService.createComment(req.body),
      }).send(res);
    }
    return Created.create({
      message: 'create comment success',
      metadata: await CommentService.createComment(req.body),
    }).send(res);
  };
  getComment = async (req: Request<any, any, any, GetCommentRequest>, res: Response, next: NextFunction) => {
    if(req.query.type =="question"){
      return Ok.create({
        message: 'get comment question success',
        metadata: await CommentQuestionService.getComment(req.query),
      }).send(res);
    }
    return Ok.create({
      message: 'get comment success',
      metadata: await CommentService.getComment(req.query),
    }).send(res);
  };
  delComment = async (req: Request<any, any, DeleteCommentRequest, any>, res: Response, next: NextFunction) => {
    if(req.query.type =='question'){
      return Ok.create({
        message: 'delete comment success',
        metadata: await CommentQuestionService.delComment(req.body),
      }).send(res);
    }
    return Ok.create({
      message: 'delete comment success',
      metadata: await CommentService.delComment(req.body),
    }).send(res);
  };
  updateComment = async (req: Request<any, any, UpdateCommentRequest, any>, res: Response, next: NextFunction) => {
    if(req.query.type =='question'){
      return Ok.create({
        message: 'delete comment success',
        metadata: await CommentQuestionService.updateComment(req.body),
      }).send(res);
    }
    return Ok.create({
      message: 'update comment success',
      metadata: await CommentService.updateComment(req.body),
    }).send(res);
  };
}
export default new CommentController();
