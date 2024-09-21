import slugify from 'slugify';
import blogModel from '../blog.model';
import { Types } from 'mongoose';
import { convertToObjectIdMongodb } from '@/utils';
import { BlogRequest } from '@/core/type.request';
import Pagination from '@/core/pagination';
import { SELECT_TIMESTAMPS } from '@/constants';
const selectDefault = {
  _id: 1,
  blog_tag: 1,
  blog_title: 1,
  blog_slug: 1,
  blog_thumb:1,
  blog_heart_count: { $size: '$blog_heart' },
};
export const newBlog = async ({ blog_userId, blog_title, blog_body, blog_thumb, blog_tag = [] }: BlogRequest) => {
  return blogModel.create({
    blog_userId: blog_userId,
    blog_title: blog_title,
    blog_slug: slugify(blog_title),
    blog_body: blog_body,
    blog_thumb: blog_thumb,
    blog_tag: blog_tag,
  });
};
export const findBlogById = async (blogId: string, select?: any) => {
  return await blogModel.findById(blogId).lean();
};
export const findBlogByQuery = async ({
  search,
  tag,
  limit = 10,
  offset = 1,
  select = selectDefault,
}: {
  search: string | undefined;
  tag?: string;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  const blog = blogModel.find();
  if (search != null && search != undefined && search != '') {
    blog.find({ blog_title: { $regex: search } });
  }
  if (tag != null && tag != undefined && tag != '') {
    blog.find({ blog_tag: tag });
  }
  blog.populate({ path: 'blog_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' }).select({ ...select, ...SELECT_TIMESTAMPS });
  const paginate = new Pagination<any>({ query: blog }).paginateByQuery({ limit: limit, offset: offset });
  return paginate;
};
export const findBlogBySlug = async ({ slug }: { slug: string | undefined; select?: any }) => {
  const blog = await blogModel
    .findOne({ blog_slug: slug })
    .populate({ path: 'blog_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
    .lean();
  return blog;
};
export const findAllBlogByUserId = async ({
  userId,
  limit = 10,
  offset = 1,
  select = selectDefault,
}: {
  userId: string | Types.ObjectId;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  const userIdParse = typeof userId == 'string' ? convertToObjectIdMongodb(userId) : userId;
  const blog = blogModel
    .find({ blog_userId: userIdParse })
    .select({ ...select , ...SELECT_TIMESTAMPS })
    .sort({
      created_at: -1,
    });
  const paginate = new Pagination<any>({ query: blog }).paginateByQuery({ limit: limit, offset: offset });
  return paginate;
};
