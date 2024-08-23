import { userLoginSchema, userRegistrationSchema, userUpdateShema } from '@/schemas/user.schemas';
import { UserDecode } from '../auth/jwtUtils';
import { Request } from 'express';
import { z } from 'zod';
import { commentCreateSchema } from '@/schemas/comment.schemas';
import { questionCreateSchema } from '@/schemas/question.schema';



export type UserSignUpRequest = z.infer<typeof userRegistrationSchema>;
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
export type UserUpdateResquest = z.infer<typeof userUpdateShema>
export type CommentCreateResquest = z.infer<typeof commentCreateSchema>
export type QuestionCreateRequest = z.infer<typeof questionCreateSchema>


export interface GetQuestionRequest {
  search?: string;
  limit?: number;
  offset?: number;
}
export interface MiddlewaresRequest extends Request {
  objKey?: {
    permissions: Array<string>;
  };
  keyStore?: any;
  refreshToken?: string;
  user?: UserDecode;
}
export type BlogRequest = { userId: string; title: string; body: string; thumb?: string };

interface SwitchControllerQuery {
  type: string;
}
export interface GetCommentRequest extends SwitchControllerQuery {
  blogId: string;
  parentId: string | null;
  limit?: number;
  offset?: number;
}
export interface DeleteCommentRequest {
  blogId: string;
  commentId: string;
}
export interface UpdateCommentRequest {
  blogId: string;
  content: string;
}
