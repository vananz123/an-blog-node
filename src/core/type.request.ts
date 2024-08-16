import { UserDecode } from '../auth/jwtUtils';
import { Request } from 'express';
import { Types,Models } from 'mongoose';
export interface UserSignUpRequset {
  name: string;
  email: string;
  password: string;
}
export interface UserLoginRequset {
  email: string;
  password: string;
  refreshToken: string;
}

export interface ApiKeyRequest extends Request {
  objKey?: {
    permissions: Array<string>;
  };
  keyStore?: any;
  refreshToken?: string;
  user?: UserDecode;
}
