import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Question';
const COLLECTION_NAME = 'Questions';

const questionSchema = new Schema(
  {
    question_tag: { type: Array, default: [] },
    question_slug: { type: String, default: '' ,require:true},
    question_content: { type: String, default: '' },
    question_userId:{type:Schema.Types.ObjectId, ref:'User'},
    question_heart:{type:Number, default:0},
    question_reader:{type:Number, default:0},
    question_bookmark:{type:Number, default:0},
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, questionSchema);