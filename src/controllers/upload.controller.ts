import { Created } from "@/core/success.response";
import { uploadImageFromLocalS3 } from "@/services/upload.service";
import { MiddlewaresRequest } from "@/core/type.request";
import { NextFunction, Request, Response } from "express";
class UploadController {
    uploadImageFromLocalS3 = async(req:MiddlewaresRequest,res:Response,next:NextFunction)=>{
        const {file} =req
        return Created.create({
            message:'Upload iamge to s3',
            metadata:await uploadImageFromLocalS3(file)
        }).send(res)
    }
}
export default new UploadController