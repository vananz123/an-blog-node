import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Question';
const COLLECTION_NAME = 'Questions';

const questionSchema = new Schema(
  {
    question_tag: { type: Array, default: [] },
    question_slug: { type: String, default: '' ,require:true},
    question_title: { type: String, default: ''},
    question_content: { type: String, default: '' },
    question_userId:{type:Schema.Types.ObjectId, ref:'User'},
    question_heart:[{type:Schema.Types.ObjectId, ref:'User'}],
    question_reader:{type:Number, default:0},
  },{
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
    collection: COLLECTION_NAME,
  }
);

//Export the model
export default model(DOCUMENT_NAME, questionSchema);