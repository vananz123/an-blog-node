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
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);
export default model(DOCUMENT_NAME, apikeySchema);
