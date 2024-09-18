import { findById } from '../models/reponsitory/user.repo';
import { BlogRequest, CreateBlogRequest, DeleteBlogRequest, GetAllBlogByUserIdRequest, GetBlogQuery, UpdateBlogRequest } from '../core/type.request';
import { BadRequestError, NotFoundError } from '../core/error.response';
import { findBlogByQuery, findBlogBySlug, newBlog, findAllBlogByUserId } from '../models/reponsitory/blog.repo';
import { convertToObjectIdMongodb, removeUnderfinedObject, updateNestedObjectParser } from '@/utils';
import blogModel from '@/models/blog.model';
import slugify from 'slugify';
import commentModel from '@/models/comment.model';
import userModel from '@/models/user.model';
class BlogService {
  static createBlog = async ({ payload }: CreateBlogRequest) => {
    const user = await findById(payload.blog_userId);
    if (!user) throw new NotFoundError('not exits user');
    const blog = await newBlog({ ...payload });
    return blog;
  };
  static getAllBlog = async ({ search , limit=10,offset=1 }: GetBlogQuery) => {
    console.log(search)
    const blog = await findBlogByQuery({ search: search , limit:limit, offset:offset });
    return blog;
  };
  static getBlogBySlug = async ({ slug, userId }: { slug: string; userId?: string }) => {
    const blog = await findBlogBySlug({ slug: slug });
    if(!blog) return null
    let bookmartCheck = false
    let bookmarkCount = 0;
    let heartCheck = false
    if(userId){
      const user = await userModel.findById(userId).lean()
      if(user){
        if(user.usr_bookmark_blog && user.usr_bookmark_blog.length > 0){
          const check = user.usr_bookmark_blog.find( x => x.toString() === blog._id.toString())
          if(check) bookmartCheck = true
        }
        if(blog.blog_heart && blog.blog_heart.length > 0){
          const checkHeart = blog.blog_heart.find( x => x.toString() === userId)
          if(checkHeart) heartCheck = true
        }
        
      }
    }
    
    const comment = (await commentModel.find({ comment_blogId: blog?._id }).lean()).length;
    return {
      ...blog,
      blog_heart_count:blog.blog_heart.length,
      blog_heart_check:heartCheck,
      blog_bookmark_check:bookmartCheck,
      blog_comment: comment,
    };
  };
  static getBlogById = async ({ id }: { id: string }) => {
    const blog = await blogModel.findById(id).select({ blog_userId: 0 }).lean();
    return blog;
  };
  static updateBlogForUser = async ({ userId, blogId, payload }: UpdateBlogRequest) => {
    const user = await findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const blog = await blogModel.findById(blogId);
    if (!blog) throw new NotFoundError('not exits blog');
    const cleanPayload = removeUnderfinedObject(payload);
    if (!cleanPayload) throw new NotFoundError('payload null');
    const payloadParser = updateNestedObjectParser(cleanPayload);
    if (payloadParser['blog_title']) {
      Object.assign(payloadParser, { blog_slug: slugify(payloadParser['blog_title']) });
    }
    const newBlog = blog.updateOne(payloadParser);
    return newBlog;
  };
  static deleteBlogForUser = async ({ userId, blogId }: DeleteBlogRequest) => {
    const user = await findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const blog = await blogModel.deleteOne({ _id: convertToObjectIdMongodb(blogId) });
    return blog;
  };
  static heartBlog = async ({ userId, blogId }: DeleteBlogRequest) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const blog = await blogModel.findById(blogId);
    if (!blog) throw new NotFoundError('not exits user');

    const heartBlog = blog.blog_heart.filter( x=> x.toString() !==userId);
    if(heartBlog.length < blog.blog_heart.length){
      const newBlog = await blog.updateOne({ blog_heart: heartBlog });
      return true;
    }

    const heartBlogAdd = [...blog.blog_heart, user._id];
    const newBlog = await blog.updateOne({ blog_heart: heartBlogAdd });
    return true;
  };
}
export default BlogService;
