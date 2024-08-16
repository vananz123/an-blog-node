import { ApiKeyRequest } from '../core/type.request';
import { NextFunction, Response } from 'express';
export const asyncHandler = (fn: Function) => {
  return (req: ApiKeyRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
