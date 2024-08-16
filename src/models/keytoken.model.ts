import { Schema ,Types,model} from "mongoose";
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys";

const keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },privateKey: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      required:true
    },
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);
export default model(DOCUMENT_NAME, keyTokenSchema);

