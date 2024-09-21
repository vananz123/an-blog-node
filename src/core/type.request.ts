import { userLoginSchema, userRegistrationSchema, userUpdateShema } from '@/schemas/user.schemas';
import { UserDecode } from '../auth/jwtUtils';
import { Request } from 'express';
import { z } from 'zod';
import { commentCreateSchema } from '@/schemas/comment.schemas';
import { questionCreateSchema } from '@/schemas/question.schema';
import { SortQuestion } from '@/models/reponsitory/question.repo';
export type UserLoginGoogleRequest = {
  credential :string
}
export type UserSignUpRequest = z.infer<typeof userRegistrationSchema>;
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
export type UserUpdateResquest = z.infer<typeof userUpdateShema>;
export type CommentCreateResquest = z.infer<typeof commentCreateSchema>;
export type CreateQuestionRequest = z.infer<typeof questionCreateSchema>;
export type UpdateQuestionRequest = {
  userId: string;
  questionId: string;
  payload: {
    question_title: string;
    question_content: string;
    question_tag?:string[];
  };
};
export type UpdateProfileRequest = {
  userId: string;
  payload: {
    usr_name: string;
    usr_avatar: string;
    usr_slug:string;
  };
};
export interface PagingType {
  limit?: number;
  offset?: number;
}
export interface GetAllBlogByUserIdRequest extends PagingType {
  userId: string;
}
export interface GetAllBlogByUserSlugRequest extends PagingType {
  slug: string;
  postType?:string;
}
export interface GetAllPostBookmarksByUserIdRequest extends PagingType {
  userId: string;
  postType?:string;
}
export interface GetAllAuthorsRequest extends PagingType{
  search?:string;
  userId?: string;
  outstanding?:boolean;
}

export interface GetQuestionRequest extends PagingType {
  search?: string;
  tag?:string;
  sort?:SortQuestion;
}
export interface MiddlewaresRequest extends Request {
  objKey?: {
    permissions: Array<string>;
  };
  keyStore?: any;
  refreshToken?: string;
  user?: UserDecode;
}
export interface DeleteBlogRequest {
  userId: string;
  blogId: string;
}

export interface CreateBlogRequest {
  payload: {
    blog_userId: string;
    blog_title: string;
    blog_body: string;
    blog_thumb?: string;
    blog_tag?:string[];
  };
}
export interface UpdateBlogRequest {
  userId: string;
  blogId: string;
  payload: {
    blog_title: string;
    blog_body: string;
    blog_thumb?: string;
    blog_tag?:string[];
  };
}
export type BlogRequest = { blog_userId: string; blog_title: string; blog_body: string; blog_thumb?: string ;blog_tag?:string[]};
export interface GetBlogQuery extends PagingType {
  search: string | undefined;
  tag?:string;
  sort?:string;
}
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
  commentId: string;
  content: string;
}

export interface DecodeUserTokenOfGoogle {
  email: string,
  email_verified: boolean,
  name: string,
  picture: string,
  given_name:string,
  family_name: string
}
