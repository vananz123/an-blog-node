import { S3Client, S3ClientConfig ,PutObjectCommand ,GetObjectCommand, DeleteObjectsCommand} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();
const config:S3ClientConfig ={
    region: 'ap-southeast-1',
    credentials: {
      accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY as string,
    },
}
export const URL_IMAGE_PUBLIC = 'https://dfarjcwyx2ukb.cloudfront.net';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || ''
export const AWS_BUCKET_PUBLIC_KEY_ID = process.env.AWS_BUCKET_PUBLIC_KEY_ID || ''
export const AWS_BUCKET_PRIVATE_KEY = process.env.AWS_BUCKET_PRIVATE_KEY || ''
const s3 = new S3Client(config);
export {
  s3,PutObjectCommand, GetObjectCommand,DeleteObjectsCommand
}
