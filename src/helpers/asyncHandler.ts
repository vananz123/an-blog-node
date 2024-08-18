import { MiddlewaresRequest } from '../core/type.request';
import { NextFunction, Response } from 'express';
export const asyncHandler = (fn: Function) => {
  return (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
