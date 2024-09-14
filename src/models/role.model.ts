import { Schema, model } from 'mongoose';
const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'Roles';

const roleSchema = new Schema(
  {
    rol_name: { type: String, default:'user', enum:['user','admin'] },
    rol_slug: { type: String, require: true },
    rol_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] },
    rol_description: { type: String, default: '' },
    rol_grants: [
      {
        resource: { type: Schema.Types.ObjectId, ref: 'Resource', require: true },
        actions: [{ type: String, required: true }],
        attributes: { type: String, default: '*' },
      },
    ],
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
export default model(DOCUMENT_NAME, roleSchema);
