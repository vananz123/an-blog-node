import { Created, Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import { CreateQuestionRequest, MiddlewaresRequest, UpdateQuestionRequest } from '../core/type.request';
import QuestionService from '@/services/question.service';
import { AnyArray } from 'mongoose';

class QuestionController {
  createQuestion = async (req: Request<any,any,CreateQuestionRequest,any>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create question success',
      metadata: await QuestionService.createQuestion(req.body),
    }).send(res);
  };
  updateQuestion = async (req: Request<any,any,UpdateQuestionRequest,any>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'update question success',
      metadata: await QuestionService.updateQuestion(req.body),
    }).send(res);
  };
  deleteQuestion = async (req: Request<any,any,any,{userId:string, questionId:string}>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'delete question success',
      metadata: await QuestionService.deleteQuestion(req.query),
    }).send(res);
  };
  getQuestionBySlug = async (req: Request<{slug:string},any,any,{userId?:string}>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'show all question success',
      metadata: await QuestionService.getQuestionBySlug({slug:req.params.slug, userId:req.query.userId}),
    }).send(res);
  };
  getQuestionById = async (req: Request<{id:string},any,any,any>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'show all question success',
      metadata: await QuestionService.getQuestionById({id:req.params.id}),
    }).send(res);
  };
  getQuestion = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'show all question success',
      metadata: await QuestionService.getAllQuestion(req.query),
    }).send(res);
  };
  heartQuestion = async (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'bookmark question success',
      metadata: await QuestionService.heartQuestion(req.body),
    }).send(res);
  };
}
export default new QuestionController();