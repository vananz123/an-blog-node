import { Schema ,model} from "mongoose";
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);
export default model(DOCUMENT_NAME, keyTokenSchema);
