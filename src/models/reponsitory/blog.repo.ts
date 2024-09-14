import slugify from 'slugify';
import blogModel from '../blog.model';
import { Types } from 'mongoose';
import { convertToObjectIdMongodb } from '@/utils';
import { BlogRequest } from '@/core/type.request';

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
  limit = 10,
  offset = 1,
  select = {
    blog_body: 0,
  },
}: {
  search: string | undefined;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  if (search == null || search || search == '') {
    const blog = await blogModel
      .find()
      .populate({ path: 'blog_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
      .select({ ...select })
      .limit(limit)
      .lean();
    return blog;
  }
  const blog = await blogModel
    .find({ blog_title: search })
    .populate({ path: 'blog_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
    .select({ ...select })
    .limit(limit)
    .lean();
  return blog;
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
  select = {
    blog_body: 0,
  },
}: {
  userId: string | Types.ObjectId;
  limit?: number;
  offset?: number;
  select?: any;
}) => {
  const userIdParse = typeof userId == 'string' ? convertToObjectIdMongodb(userId) : userId;
  const blog = await blogModel
    .find({ blog_userId: userIdParse })
    .select({ ...select })
    .limit(limit)
    .sort({
      created_at:1
    })
    .lean();
  return blog;
};
