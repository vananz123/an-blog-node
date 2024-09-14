import { z } from 'zod';

export const questionCreateSchema = z.object({
  payload: z.object({
    question_tag: z.string().array(),
    question_userId: z.string(),
    question_title: z.string(),
    question_content: z.string(),
  }),
});
