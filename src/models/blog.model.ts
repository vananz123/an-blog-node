import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Blog';
const COLLECTION_NAME = 'Blogs';

const blogSchema = new Schema(
  {
    blog_title: { type: String, default: '' },
    blog_slug: { type: String, default: '' ,require:true},
    blog_body: { type: String, default: '' },
    blog_thumb: { type: String, default: '' },
    blog_userId:{type:Schema.Types.ObjectId, ref:'User'},
    blog_bookmark:{type:Number, default:0},
    blog_like:{type:Number, default:0},
    blog_heart:{type:Number, default:0},
    blog_reader:{type:Number, default:0},
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, blogSchema);
