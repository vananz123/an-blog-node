import { findById } from '../models/reponsitory/user.repo';
import { GetQuestionRequest, CreateQuestionRequest, UpdateQuestionRequest } from '../core/type.request';
import { NotFoundError } from '../core/error.response';
import { findQuestionByQuery, findQuestionBySlug, newQuestion } from '@/models/reponsitory/question.repo';
import questionModel from '@/models/question.model';
import { removeUnderfinedObject, updateNestedObjectParser } from '@/utils';
import slugify from 'slugify';

class QuestionService {
  static createQuestion = async ({ payload }: CreateQuestionRequest) => {
    const user = await findById(payload.question_userId);
    console.log(payload.question_userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await newQuestion({ ...payload });
    return question;
  };
  static getQuestionBySlug = async ({ slug }: { slug: string }) => {
    const question = await findQuestionBySlug({slug});
    return question;
  };
  static getQuestionById = async ({ id }: { id: string }) => {
    const question = await questionModel.findById(id).select({ question_userId: 0 }).lean();
    return question;
  };
  static updateQuestion = async ({ userId, questionId, payload }: UpdateQuestionRequest) => {
    const user = await findById(userId);
    console.log(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await questionModel.findById(questionId);
    if (!question) throw new NotFoundError('not exits question');
    const cleanPayload = removeUnderfinedObject(payload);
    if (!cleanPayload) throw new NotFoundError('payload null');
    const payloadParser = updateNestedObjectParser(cleanPayload);
    if (payloadParser['question_title']) {
      Object.assign(payloadParser, { question_slug: slugify(payloadParser['question_title']) });
    }
    const newQuestion = question.updateOne(payloadParser);
    return newQuestion;
  };
  static deleteQuestion = async ({ userId, questionId }: { userId: string; questionId: string }) => {
    const user = await findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = questionModel.deleteOne({ _id: questionId });
    if (!question) throw new NotFoundError('not exits question');
    return question;
  };
  static getAllQuestion = async ({ search, limit = 10, offset = 0 }: GetQuestionRequest) => {
    const question = await findQuestionByQuery({search,limit,offset});
    return question;
  };
}
export default QuestionService;
