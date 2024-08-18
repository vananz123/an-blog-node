import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Comment';
const COLLECTION_NAME = 'Comments';

const commentSchema = new Schema(
  {
    comment_blogId: { type:Schema.Types.ObjectId, ref:'Blog' },
    comment_userId:{type:Schema.Types.ObjectId, ref:'User'},
    comment_content: { type: String, default: ''},
    comment_like:{type:Number, default:0},
    comment_left: { type: Number, default: 0},
    comment_right: { type: Number, default: 0},
    comment_parentId: { type:Schema.Types.ObjectId, ref:DOCUMENT_NAME },
    isDeleted:{type:Boolean, default:false}
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, commentSchema);