import { Created } from "@/core/success.response";
import { uploadImageFromLocalS3 , getImageFromLocalS3 } from "@/services/upload.service";
import { MiddlewaresRequest } from "@/core/type.request";
import { NextFunction, Request, Response } from "express";
type GetImageQuery ={
    fileName:string
}
class UploadController {
    uploadImageFromLocalS3 = async(req:MiddlewaresRequest,res:Response,next:NextFunction)=>{
        const {file} =req
        return Created.create({
            message:'Upload iamge to s3',
            metadata:await uploadImageFromLocalS3(file)
        }).send(res)
    }
    getImageFromLocalS3 = async(req:Request<any,any,any,GetImageQuery>,res:Response,next:NextFunction)=>{
        return Created.create({
            message:'Upload iamge to s3',
            metadata:await getImageFromLocalS3(req.query.fileName)
        }).send(res)
    }
}
export default new UploadController