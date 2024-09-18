import { InferSchemaType, Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    usr_id: { type: Number, require: true },
    usr_slug: { type: String, require: true },
    usr_name: { type: String, default: '' },
    usr_password: { type: String, default: '' },
    usr_salf: { type: String, default: '' },
    usr_bookmark_blog:[{ type: Schema.Types.ObjectId, ref: 'Blog'}],
    usr_bookmark_question:[{ type: Schema.Types.ObjectId, ref: 'Question'}],
    usr_follower:[{ type: Schema.Types.ObjectId, ref: DOCUMENT_NAME}],
    usr_following:[{ type: Schema.Types.ObjectId, ref: DOCUMENT_NAME }],
    usr_email: { type: String, default: '' },
    usr_phone: { type: String, default: '' },
    usr_sex: { type: String, default: '' },
    usr_avatar: { type: String, default: '' },
    usr_date_of_birth: { type: Date, default: null },
    usr_role: { type: Schema.Types.ObjectId, ref: 'Role' },
    usr_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
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
export default model(DOCUMENT_NAME, userSchema);
export type UserModel = InferSchemaType<typeof userSchema>
