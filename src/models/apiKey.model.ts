import { Schema ,model} from "mongoose";
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const apikeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
   
    permissions: {
      type: [String],
      required: true,
      enum:[
        '0000','1111','2222'
      ]
    },
  },
  {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    },
    collection: COLLECTION_NAME,
  },
);
export default model(DOCUMENT_NAME, apikeySchema);
