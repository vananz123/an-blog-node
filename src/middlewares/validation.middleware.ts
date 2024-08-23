import { BadRequestError } from '../core/error.response';
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
export default function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const errorMessages = error.errors.map((issue: any) => ({
            message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        throw new BadRequestError(`Invalid data`,500,errorMessages)
      } else {
        throw new BadRequestError(`Internal Server Error`)
      }
    }
  };
}
