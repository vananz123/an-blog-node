import { Created } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import { MiddlewaresRequest } from '../core/type.request';
import QuestionService from '@/services/question.service';

class QuestionController {
  createQuestion = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create question success',
      metadata: await QuestionService.createQuestion(req.body),
    }).send(res);
  };
  getQuestion = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'show all question success',
      metadata: await QuestionService.showAllQuestion(req.query),
    }).send(res);
  };
}
export default new QuestionController();