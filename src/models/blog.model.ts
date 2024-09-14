import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Blog';
const COLLECTION_NAME = 'Blogs';

const blogSchema = new Schema(
  {
    blog_tag: { type: Array, default: [] },
    blog_title: { type: String, default: '' },
    blog_slug: { type: String, default: '' ,require:true},
    blog_body: { type: String, default: '' },
    blog_thumb: { type: String, default: '' },
    blog_userId:{type:Schema.Types.ObjectId, ref:'User'},
    blog_heart:[{type:Schema.Types.ObjectId, ref:'User'}],
    blog_reader:{type:Number, default:0},
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, blogSchema);
