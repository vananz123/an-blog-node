import {
  s3,
  PutObjectCommand,
  AWS_BUCKET_NAME,
  AWS_BUCKET_PRIVATE_KEY,
  AWS_BUCKET_PUBLIC_KEY_ID,
  URL_IMAGE_PUBLIC
} from '@/configs/s3.config';
import { BadRequestError } from '@/core/error.response';
import { nameFileRamdom } from '@/utils';
//import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import dotenv from 'dotenv';
dotenv.config();
export const uploadImageFromLocalS3 = async (file: Express.Multer.File | undefined) => {
  try {
    if (!file) throw new BadRequestError('not exits file');
    const fileName = nameFileRamdom();
    const comman = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName, //file.originalname || 'unknow',
      Body: file.buffer,
      ContentType: 'image/jpeg',
    });

    const resutl = await s3.send(comman);

    // const singleUrl = new GetObjectCommand({
    //   Bucket: AWS_BUCKET_PUBLIC_KEY_ID,
    //   Key: fileName,
    // });
    const privateKey = AWS_BUCKET_PRIVATE_KEY;
    const keyPairId = AWS_BUCKET_PUBLIC_KEY_ID;
    const dateLessThan = '2024-08-24';
    const url = await getSignedUrl({
      url: `${URL_IMAGE_PUBLIC}/${fileName}`,
      keyPairId,
      dateLessThan,
      privateKey,
    });
    return {
      url,
      resutl,
    };
  } catch (error) {
    console.error('Error uploadimg image from s3', error);
  }
};
