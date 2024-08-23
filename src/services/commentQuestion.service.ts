import { convertToObjectIdMongodb } from '../utils';
import commentQuestionModel from '@/models/commentQuestion.model';
import { NotFoundError } from '../core/error.response';
import { CommentCreateResquest, DeleteCommentRequest, GetCommentRequest } from '../core/type.request';
import { findQuestionById } from '@/models/reponsitory/question.repo';

class CommentQuestionService {
  static createComment = async ({
    blogId,
    userId,
    content,
    parentId = null,
  }: CommentCreateResquest) => {
    const comment = new commentQuestionModel({
      comment_questionId: blogId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentId,
    });
    let rightValue = 0;
    if (parentId != null && parentId != "") {
      //replay comment
      const parentComment = await commentQuestionModel.findById(parentId)
      if (!parentComment) throw new NotFoundError('not exist parentId comment');
      // update comment
      rightValue = parentComment.comment_right;
      await commentQuestionModel.updateMany(
        {
          comment_questionId: convertToObjectIdMongodb(blogId),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        },
      );
      await commentQuestionModel.updateMany(
        {
          comment_questionId: convertToObjectIdMongodb(blogId),
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        },
      );
    } else {
      //new comment
      const maxRightValue = await commentQuestionModel.findOne({ comment_questionId: convertToObjectIdMongodb(blogId) }, 'comment_right', {
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
      const parentComment = await commentQuestionModel.findById(parentId);
      if (!parentComment) throw new NotFoundError('not exist parentId comment');
      const comments = await commentQuestionModel
        .find({
          comment_questionId: convertToObjectIdMongodb(blogId),
          comment_left: { $gt: parentComment.comment_left },
          comment_right: { $lte: parentComment.comment_right },
        })
        .select({
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parentId: 1,
        })
        .sort({
          comment_left: 1,
        });
      return comments;
    }
    const comments = await commentQuestionModel
      .find({
        comment_questionId: convertToObjectIdMongodb(blogId),
        comment_parentId: parentId,
      })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      });
    return comments;
  };
  static delComment = async ({ blogId, commentId }: DeleteCommentRequest) => {
    const blog = await findQuestionById(blogId);
    if (!blog) throw new NotFoundError('not exits blog');
    const comment = await commentQuestionModel.findById(commentId);
    if (!comment) throw new NotFoundError('not exits comment');
    const rightValue = comment.comment_right;
    const leftValue = comment.comment_left;
    // cal with
    const width = rightValue - leftValue + 1;
    // delete all chilren commentId
    await commentQuestionModel.deleteMany({
      comment_questionId: convertToObjectIdMongodb(blogId),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });
    //update value right
    await commentQuestionModel.updateMany(
      {
        comment_questionId: convertToObjectIdMongodb(blogId),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      },
    );
    //update value left
    await commentQuestionModel.updateMany(
      {
        comment_questionId: convertToObjectIdMongodb(blogId),
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      },
    );
    return true
  };
  static updateComment = async({blogId,content}:{blogId:string;content:string})=>{
    const comment = await commentQuestionModel.findOne({_id:blogId});
    if (!comment) throw new NotFoundError('not exist comment');
    await comment.updateOne({comment_content:content})
    return comment._id
  }
}
export default CommentQuestionService;
