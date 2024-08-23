import { findById } from '../models/reponsitory/user.repo';
import {  GetQuestionRequest, QuestionCreateRequest } from '../core/type.request';
import { NotFoundError } from '../core/error.response';
import { findQuestionByQuery, newQuestion } from '@/models/reponsitory/question.repo';
import questionModel from '@/models/question.model';

class QuestionService {
  static createQuestion = async ({ userId, content }: QuestionCreateRequest) => {
    const user = await findById(userId);
    console.log(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await newQuestion({ userId, content });
    return question;
  };
  static showAllQuestion = async ({ search, limit=30,offset=0 }: GetQuestionRequest) => {
    const question = await  questionModel.find().lean();
    return question;
  };
}
export default QuestionService;
