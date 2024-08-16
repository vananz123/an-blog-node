import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Resource';
const COLLECTION_NAME = 'Resources';

const resourceSchema = new Schema(
  {
    src_name:{type:String,require:true},
    src_slug:{type:String,require:true},
    src_description:{type:String,default:''},
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, resourceSchema);