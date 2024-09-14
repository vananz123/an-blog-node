import { NotFoundError } from '@/core/error.response';
import { DeleteBlogRequest, GetAllBlogByUserIdRequest, GetAllPostBookmarksByUserIdRequest, UpdateProfileRequest } from '@/core/type.request';
import blogModel from '@/models/blog.model';
import questionModel from '@/models/question.model';
import { findAllBlogByUserId } from '@/models/reponsitory/blog.repo';
import { findAllQuestionByUserId } from '@/models/reponsitory/question.repo';
import { findById } from '@/models/reponsitory/user.repo';
import userModel from '@/models/user.model';
import { convertToObjectIdMongodb, getIntoData, removeUnderfinedObject, updateNestedObjectParser } from '@/utils';

class UserService {
  static bookmarkBlog = async ({ userId, blogId }: DeleteBlogRequest) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const blog = await blogModel.findById(blogId);
    if (!blog) throw new NotFoundError('not exits user');

    const bookmartBlog = user.usr_bookmark_blog.filter((x) => x.toString() !== blogId);
    if(bookmartBlog.length < user.usr_bookmark_blog.length){
      const newUser = await user.updateOne({ usr_bookmark_blog: bookmartBlog });
    return newUser;
    }
    const bookmartBlogAdd = [...user.usr_bookmark_blog, blog._id];
    const newUser = await user.updateOne({ usr_bookmark_blog: bookmartBlogAdd });
    return newUser;
  };
  static bookmarkQuestion = async ({ userId, questionId }: { userId: string; questionId: string }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await questionModel.findById(questionId);
    if (!question) throw new NotFoundError('not exits user');
    const bookmartQuestion = [...user.usr_bookmark_question, question._id];
    const newUser = await user.updateOne({ usr_bookmark_question: bookmartQuestion });
    return newUser;
  };
  static unBookmarkQuestion = async ({ userId, questionId }: { userId: string; questionId: string }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const question = await questionModel.findById(questionId);
    if (!question) throw new NotFoundError('not exits user');
    const bookmartQuestion = user.usr_bookmark_question.filter((x) => x.toString() !== questionId);
    const newUser = await user.updateOne({ usr_bookmark_question: bookmartQuestion });
    return newUser;
  };
  static follow = async ({ userId, userIdFollow }: { userId: string; userIdFollow: string }) => {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const userFollow = await userModel.findById(userIdFollow);
    if (!userFollow) throw new NotFoundError('not exits user');
    
    const newFollower = userFollow.usr_follower.filter((x) => x.toString() !== userId);
    if (newFollower.length < userFollow.usr_follower.length) {
      await userFollow.updateOne({ usr_follower: newFollower });
      const newFollowing = user.usr_following.filter((x) => x.toString() !== userIdFollow);
      await user.updateOne({ usr_following: newFollowing });
      return `${user.usr_name} unfollowed ${userFollow.usr_name}`;
    }
    const newFollowerAdd = [...userFollow.usr_follower, user._id];
    const ttt = await userFollow.updateOne({ usr_follower: newFollowerAdd });
    const newFollowing = [...user.usr_following, userFollow._id];
    await user.updateOne({ usr_following: newFollowing });
    return `${user.usr_name} followed ${userFollow.usr_name}`;
  };
  static getAllBlog = async ({ userId, limit = 10, offset = 1 }: GetAllBlogByUserIdRequest) => {
    // const user = await findById(userId);
    // if (!user) throw new NotFoundError('not exits user');
    const blog = await findAllBlogByUserId({ userId: userId });
    return blog;
  };
  static getAllQuestion = async ({ userId, limit = 10, offset = 1 }: GetAllBlogByUserIdRequest) => {
    // const user = await findById(userId);
    // console.log(user)
    // if (!user) throw new NotFoundError('not exits user');
    const question = await findAllQuestionByUserId({ userId: userId });
    return question;
  };

  static getAllBlogBookmark = async ({ userId, limit = 10, offset = 1 }: GetAllPostBookmarksByUserIdRequest) => {
    const user = await userModel.findById(userId).populate({
      path: 'usr_bookmark_blog',
      select: '_id blog_tag blog_title blog_slug blog_thumb blog_userId',
      populate: { path: 'blog_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' },
    });
    if (!user) throw new NotFoundError('not exits user');
    const blog = user.usr_bookmark_blog;
    return blog;
  };
  static getAllQuestionBookmark = async ({ userId, limit = 10, offset = 1 }: GetAllPostBookmarksByUserIdRequest) => {
    const user = await userModel.findById(userId).populate({
      path: 'usr_bookmark_question',
      select: '_id question_tag question_title question_slug question_userId',
      populate: { path: 'question_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' },
    });
    if (!user) throw new NotFoundError('not exits user');
    const question = user.usr_bookmark_question;
    return question;
  };
  static updateProfile = async ({userId,payload}:UpdateProfileRequest)=> {
    const user = await userModel.findById(userId);
    if (!user) throw new NotFoundError('not exits user');
    const cleanPayload = removeUnderfinedObject(payload);
    if (!cleanPayload) throw new NotFoundError('payload null');
    const payloadParser = updateNestedObjectParser(cleanPayload);
    const newUser = user.updateOne(payloadParser);
    return newUser;
  }
  static profileBySlug = async (slug: string, userId?: string) => {
    const user = await userModel.findOne({ usr_slug: slug }).lean();
    if (!user) throw new NotFoundError('not exits user');
    let checkFollower = false;
    if (userId) {
      const userCheck = await userModel.findById(userId).lean();
      const check = user.usr_follower.find((x) => x.toString() == userId);
      if (check) checkFollower = true;
    }
    const newUser = {
      ...user,
      usr_follower_check: checkFollower,
      usr_follower_count: user.usr_follower.length,
      usr_following_count: user.usr_following.length,
    };
    return getIntoData({
      fileds: ['_id', 'usr_name', 'usr_slug', 'usr_email', 'usr_avatar', 'usr_follower_count', 'usr_following_count', 'usr_follower_check'],
      object: newUser,
    });
  };
}
export default UserService;
