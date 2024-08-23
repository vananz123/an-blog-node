import { Schema, Types, model } from 'mongoose';
// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'Notifications';

enum NotificationType {
  blog_new = 'BLOG-001',
  blog_like = 'BLOG-002',
}
const notificationSchema = new Schema(
  {
    noti_type: { type: String, enum: NotificationType ,require:true},
    noti_senderId:{type:String,require:true},
    noti_receivedId:{type:String,require:true},
    noti_content:{type:String,require:true},
    noti_options:{type:Object,default:{}},
  },
  {
    timeStamp: true,
    collection: COLLECTION_NAME,
  },
);
export default model(DOCUMENT_NAME, notificationSchema);
