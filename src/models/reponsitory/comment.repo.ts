import commentModel from "../comment.model";

export const findCommentById = async ( commentId: string,select?: any) => {
    return await commentModel.findById(commentId).lean();
  };