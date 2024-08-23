import questionModel from '../question.model';
import { QuestionCreateRequest } from '../../core/type.request';
import { nameFileRamdom } from '@/utils';

export const newQuestion = async ({ userId, content }: QuestionCreateRequest) => {
  const slug = nameFileRamdom();
  return questionModel.create({
    question_userId: userId,
    question_slug: slug,
    question_content: content,
  });
};
export const findQuestionById = async (questionId: string, select?: any) => {
  return await questionModel.findById(questionId).lean();
};
export const findQuestionByQuery = async ({ search, limit, offset }: { search?: string; limit: number; offset: number; select?: any }) => {
  if (search || search == '') {
    const resulf = await questionModel.find().lean();
    return resulf
  }
  return await questionModel.find({ question_content: search }).limit(limit).lean();
};
