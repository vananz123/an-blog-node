import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'CommentQuestion';
const COLLECTION_NAME = 'CommentQuestions';

const commentQuestionSchema = new Schema(
  {
    comment_questionId: { type:Schema.Types.ObjectId, ref:'Question' },
    comment_userId:{type:Schema.Types.ObjectId, ref:'User'},
    comment_content: { type: String, default: ''},
    comment_heart:{type:Number, default:0},
    comment_left: { type: Number, default: 0},
    comment_right: { type: Number, default: 0},
    comment_parentId: { type:Schema.Types.ObjectId, ref:DOCUMENT_NAME },
    isDeleted:{type:Boolean, default:false}
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
    collection: COLLECTION_NAME,
  },
);
commentQuestionSchema.virtual('comment_replies',{
  ref: DOCUMENT_NAME, 
  localField: '_id',
  foreignField: 'comment_parentId', 
  justOne: false,
})
commentQuestionSchema.set('toJSON', { virtuals: true });
commentQuestionSchema.set('toObject', { virtuals: true });
//Export the model
export default model(DOCUMENT_NAME, commentQuestionSchema);