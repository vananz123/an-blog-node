import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    usr_id: { type: Number, require: true },
    usr_slug: { type: String, require: true },
    usr_name: { type: String, default: '' },
    usr_password: { type: String, default: '' },
    usr_salf: { type: String, default: '' },
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
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);

//Export the model
export default model(DOCUMENT_NAME, userSchema);
