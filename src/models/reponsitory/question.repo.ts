import questionModel from '../question.model';
import { CreateQuestionRequest } from '../../core/type.request';
import { convertToObjectIdMongodb, nameFileRamdom } from '@/utils';
import slugify from 'slugify';
import { Types } from 'mongoose';

export const newQuestion = async ({
  question_userId,
  question_content,
  question_title,
  question_tag = [],
}: {
  question_userId: string;
  question_title: string;
  question_content: string;
  question_tag?: string[];
}) => {
  return questionModel.create({
    question_title:question_title,
    question_userId: question_userId,
    question_slug: slugify(question_title),
    question_content: question_content,
    question_tag: question_tag,
  });
};
export const findQuestionById = async (questionId: string, select?: any) => {
  return await questionModel.findById(questionId).lean();
};
export const findQuestionByQuery = async ({
  search,
  limit = 10,
  offset = 1,
  select = {
    question_content: 0,
  },
}: {
  search?: string;
  limit: number;
  offset: number;
  select?: any;
}) => {
  if (search == null || search || search == '') {
    const question = await questionModel
      .find()
      .populate({ path: 'question_userId', select: 'usr_name usr_email _id usr_slug usr_avatar' })
      .select({ ...select })
      .limit(limit)
      .lean();
    return question;
  }
  return await questionModel
    .find({ question_content: search })
    .populate({ path: 'question_userId', select: 'usr_name usr_email _id usr_slug usr_avatar' })
    .select({ ...select })
    .limit(limit)
    .lean();
};

export const findQuestionBySlug = async ({ slug }: { slug: string | undefined; select?: any }) => {
  const blog = await questionModel.findOne({ question_slug: slug }).populate({ path: 'question_userId', select: 'usr_name usr_email _id usr_avatar' }).lean();
  return blog;
};
export const findAllQuestionByUserId = async ({
  userId,
  limit = 10,
  offset = 1,
  select = {
    question_content: 0,
  },
}: {
  userId: string | Types.ObjectId;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  const userIdParse = typeof userId == 'string' ? convertToObjectIdMongodb(userId) : userId;
  const question = await questionModel
    .find({ question_userId: userIdParse })
    .select({ ...select })
    .limit(limit)
    .lean();
  return question;
};
