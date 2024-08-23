import slugify from 'slugify';
import blogModel from '../blog.model';
import { BlogRequest } from '../../core/type.request';

export const newBlog = async ({ userId, title, body, thumb }: BlogRequest) => {
  return blogModel.create({
    blog_userId: userId,
    blog_title: title,
    blog_slug: slugify(title),
    blog_body: body,
    blog_thumb: thumb,
  });
};
export const findBlogById = async (blogId: string, select?: any ) => {
  return await blogModel.findById(blogId).lean();
};
