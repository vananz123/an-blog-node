import BlogService from '../services/blog.service';
import { Created, Ok } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
import {
  CreateBlogRequest,
  DeleteBlogRequest,
  GetAllBlogByUserIdRequest,
  GetBlogQuery,
  MiddlewaresRequest,
  UpdateBlogRequest,
} from '../core/type.request';
type BlogParam = {
  slug: string;
};
class BlogController {
  createBlog = async (req: Request<any, any, CreateBlogRequest, any>, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create blog success',
      metadata: await BlogService.createBlog(req.body),
    }).send(res);
  };
  updateBlogForUser = async (req: Request<any, any, UpdateBlogRequest, any>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'update blog success',
      metadata: await BlogService.updateBlogForUser(req.body),
    }).send(res);
  };
  deleteBlogForUser = async (req: Request<any, any, any, DeleteBlogRequest>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'delete blog success',
      metadata: await BlogService.deleteBlogForUser(req.query),
    }).send(res);
  };
  getAllBlog = async (req: Request<any, any, any, GetBlogQuery>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'get blog success',
      metadata: await BlogService.getAllBlog(req.query),
    }).send(res);
  };
  getBlogBySlug = async (req: Request<BlogParam, any, any, { userId?: string }>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'get blog by slug success',
      metadata: await BlogService.getBlogBySlug({ slug: req.params.slug, userId: req.query.userId }),
    }).send(res);
  };
  getBlogById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'get blog by id success',
      metadata: await BlogService.getBlogById({ id: req.params.id }),
    }).send(res);
  };
  heartBlog = async (req: Request<any, any, DeleteBlogRequest, any>, res: Response, next: NextFunction) => {
    console.log(req.params);
    return Ok.create({
      message: 'bookmart blog success',
      metadata: await BlogService.heartBlog(req.body),
    }).send(res);
  };
  
}
export default new BlogController();
