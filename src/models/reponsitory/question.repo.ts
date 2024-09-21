import questionModel from '../question.model';
import { CreateQuestionRequest } from '../../core/type.request';
import { convertToObjectIdMongodb, nameFileRamdom } from '@/utils';
import slugify from 'slugify';
import { Types } from 'mongoose';
import Pagination from '@/core/pagination';
import { SELECT_TIMESTAMPS } from '@/constants';

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
    question_title: question_title,
    question_userId: question_userId,
    question_slug: slugify(question_title),
    question_content: question_content,
    question_tag: question_tag,
  });
};
export const findQuestionById = async (questionId: string, select?: any) => {
  return await questionModel.findById(questionId).lean();
};
const selectDefault = {
  _id: 1,
  question_title: 1,
  question_tag: 1,
  question_slug: 1,
  question_reader: 1,
  question_heart_count: { $size: '$question_heart' },
};
export type SortQuestion = 'outstanding' | 'latest' | 'oldest';
export const findQuestionByQuery = async ({
  search,
  tag,
  limit = 10,
  offset = 1,
  select = selectDefault,
  sort = 'outstanding',
}: {
  search?: string;
  tag?: string;
  limit: number;
  offset: number;
  select?: any;
  sort?: SortQuestion;
}) => {
  const question = questionModel.find();
  if (search != null && search != undefined && search != '') {
    question.find({ question_title: { $regex: search } });
  }
  if (tag != null && tag != undefined && tag != '') {
    question.find({ question_tag: tag });
  }
  question.populate({ path: 'question_userId', select: 'usr_name usr_email _id usr_slug usr_avatar' }).select({ ...select, ...SELECT_TIMESTAMPS });
  switch (sort) {
    case 'outstanding':
      question.sort({
        question_reader: -1,
      });
    case 'latest':
      question.sort({
        create_at: -1,
      });
    case 'oldest':
      question.sort({
        create_at: 1,
      });
  }

  const paginate = new Pagination<any>({ query: question }).paginateByQuery({ limit: limit, offset: offset });
  return paginate;
};

export const findQuestionBySlug = async ({ slug }: { slug: string | undefined; select?: any }) => {
  const blog = await questionModel
    .findOne({ question_slug: slug })
    .populate({ path: 'question_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
    .lean();
  return blog;
};
export const findAllQuestionByUserId = async ({
  userId,
  limit = 10,
  offset = 1,
  select = selectDefault,
}: {
  userId: string | Types.ObjectId;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  const userIdParse = typeof userId == 'string' ? convertToObjectIdMongodb(userId) : userId;
  const question = questionModel.find({ question_userId: userIdParse }).select({ ...select, ...SELECT_TIMESTAMPS });
  const paginate = new Pagination<any>({ query: question }).paginateByQuery({ limit: limit, offset: offset });
  return paginate;
};
