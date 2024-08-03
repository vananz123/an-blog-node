import { Schema,model } from "mongoose";
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verfify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
export default model(DOCUMENT_NAME, userSchema);
