import { convertToObjectIdMongodb } from '../utils';
import commentModel from '../models/comment.model';
import { NotFoundError } from '../core/error.response';
import { CommentCreateResquest, DeleteCommentRequest, GetCommentRequest } from '../core/type.request';
import { findBlogById } from '../models/reponsitory/blog.repo';
import { findCommentById } from '../models/reponsitory/comment.repo';
import { forEach } from 'lodash';

class CommentService {
  static createComment = async ({ blogId, userId, content, parentId = null }: CommentCreateResquest) => {
    const comment = new commentModel({
      comment_blogId: blogId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentId,
    });
    let rightValue = 0;
    if (parentId != null && parentId != '') {
      //replay comment
      const parentComment = await findCommentById(parentId);
      if (!parentComment) throw new NotFoundError('not exist parentId comment');
      // update comment
      rightValue = parentComment.comment_right;
      await commentModel.updateMany(
        {
          comment_blogId: convertToObjectIdMongodb(blogId),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        },
      );
      await commentModel.updateMany(
        {
          comment_blogId: convertToObjectIdMongodb(blogId),
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        },
      );
    } else {
      //new comment
      const maxRightValue = await commentModel.findOne({ comment_blogId: convertToObjectIdMongodb(blogId) }, 'comment_right', {
        sort: { comment_right: -1 },
      });
      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;
    await comment.save();
    return comment;
  };
  static getComment = async ({ blogId, parentId = null, limit = 30, offset = 0 }: GetCommentRequest) => {
    if (parentId) {
      const parentComment = await commentModel.findById(parentId);
      if (!parentComment) throw new NotFoundError('not exist parentId comment');
      const comments = await commentModel
        .find({
          comment_blogId: convertToObjectIdMongodb(blogId),
          comment_left: { $gt: parentComment.comment_left },
          comment_right: { $lte: parentComment.comment_right },
        })
        .populate({ path: 'comment_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
        .populate({ path: 'comment_parentId' })
        .select({
          _id:1,
          comment_userId: 1,
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parentId: 1,
          created_at:1,
        })
        .sort({
          comment_left: 1,
        });

      return comments;
    }
    const comments = await commentModel
      .find({
        comment_blogId: convertToObjectIdMongodb(blogId),
        comment_parentId: parentId,
      })
      .populate('comment_replies')
      .populate({ path: 'comment_userId', select: 'usr_name usr_email _id usr_avatar usr_slug' })
      .select({
        _id:1,
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parentId: 1,
        comment_replies:1,
        created_at:1,
      })
      .sort({
        comment_left: 1,
      });
    return comments;
  };
  static delComment = async ({ blogId, commentId }: DeleteCommentRequest) => {
    const blog = await findBlogById(blogId);
    if (!blog) throw new NotFoundError('not exits blog');
    const comment = await findCommentById(commentId);
    if (!comment) throw new NotFoundError('not exits comment');
    const rightValue = comment.comment_right;
    const leftValue = comment.comment_left;
    // cal with
    const width = rightValue - leftValue + 1;
    // delete all chilren commentId
    await commentModel.deleteMany({
      comment_blogId: convertToObjectIdMongodb(blogId),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });
    //update value right
    await commentModel.updateMany(
      {
        comment_blogId: convertToObjectIdMongodb(blogId),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      },
    );
    //update value left
    await commentModel.updateMany(
      {
        comment_blogId: convertToObjectIdMongodb(blogId),
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      },
    );
    return true;
  };
  static updateComment = async ({ commentId, content }: { commentId: string; content: string }) => {
    const comment = await commentModel.findOne({ _id: commentId });
    if (!comment) throw new NotFoundError('not exist comment');
    await comment.updateOne({ comment_content: content });
    return comment._id;
  };
}
export default CommentService;
