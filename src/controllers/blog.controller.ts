import BlogService from '../services/blog.service';
import { Created } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import { MiddlewaresRequest } from '../core/type.request';

class BlogController {
  createBlog = async (req: MiddlewaresRequest, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create blog success',
      metadata: await BlogService.createBlog(req.body),
    }).send(res);
  };
}
export default new BlogController();
