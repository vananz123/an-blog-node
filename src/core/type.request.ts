import { userLoginSchema, userRegistrationSchema } from '@/schemas/user.schemas';
import { UserDecode } from '../auth/jwtUtils';
import { Request } from 'express';
import { z } from 'zod';
export type UserSignUpRequset = z.infer<typeof userRegistrationSchema>;
export type UserLoginRequset = z.infer<typeof userLoginSchema>;
export interface MiddlewaresRequest extends Request {
  objKey?: {
    permissions: Array<string>;
  };
  keyStore?: any;
  refreshToken?: string;
  user?: UserDecode;
}
export type BlogRequest = { userId: string; title: string; body: string; thumb?: string };
export interface GetCommentRequest {
  blogId: string;
  parentId: string | null;
  limit?: number;
  offset?: number;
}
export interface DeleteCommentRequest {
  blogId: string;
  commentId: string;
}
