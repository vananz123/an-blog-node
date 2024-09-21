import { findById } from '../models/reponsitory/user.repo';
import { GetQuestionRequest, CreateQuestionRequest, UpdateQuestionRequest } from '../core/type.request';
import { NotFoundError } from '../core/error.response';
import { findQuestionByQuery, findQuestionBySlug, newQuestion } from '@/models/reponsitory/question.repo';
import questionModel from '@/models/question.model';
import { removeUnderfinedObject, updateNestedObjectParser } from '@/utils';
import slugify from 'slugify';
import userModel from '@/models/user.model';
import commentQuestionModel from '@/models/commentQuestion.model';

class QuestionService {
  static createQuestion = async ({ payload }: CreateQuestionRequest) => {
    const user = await findById(payload.question_userId);
    console.log(payload.question_userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await newQuestion({ ...payload });
    return question;
  };
  static getQuestionBySlug = async ({ slug, userId }: { slug: string; userId?: string }) => {
    const question = await findQuestionBySlug({ slug });
    if (!question) return null;
    let bookmartCheck = false;
    let bookmarkCount = 0;
    let heartCheck = false;
    if (userId) {
      const user = await userModel.findById(userId).lean();
      if (user) {
        if (user.usr_bookmark_question && user.usr_bookmark_question.length > 0) {
          const check = user.usr_bookmark_question.find((x) => x.toString() === question._id.toString());
          if (check) bookmartCheck = true;
        }
        if (question.question_heart && question.question_heart.length > 0) {
          const checkHeart = question.question_heart.find((x) => x.toString() === userId);
          if (checkHeart) heartCheck = true;
        }
      }
    }

    const comment = (await commentQuestionModel.find({ comment_questionId: question?._id }).lean()).length;
    return {
      ...question,
      question_heart_count: question.question_heart.length,
      question_heart_check: heartCheck,
      question_bookmark_check: bookmartCheck,
      question_comment: comment,
    };
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
  static getAllQuestion = async ({ sort, tag, search, limit = 10, offset = 0 }: GetQuestionRequest) => {
    const question = await findQuestionByQuery({ search, tag, limit, offset, sort });
    return question;
  };
  static heartQuestion = async ({ userId, questionId }: { userId: string; questionId: string }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await questionModel.findById(questionId);
    if (!question) throw new NotFoundError('not exits user');
    const heartBlog = question.question_heart.filter((x) => x.toString() !== userId);
    if (heartBlog.length < question.question_heart.length) {
      const newBlog = await question.updateOne({ question_heart: heartBlog });
      return true;
    }
    const heartBlogAdd = [...question.question_heart, user._id];
    const newBlog = await question.updateOne({ question_heart: heartBlogAdd });
    return true;
  };
}
export default QuestionService;
