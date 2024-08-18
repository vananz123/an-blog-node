import { Created, Ok } from "../core/success.response";
import { NextFunction, Request, Response } from "express";
import CommentService from "../services/comment.service";
import { DeleteCommentRequest, GetCommentRequest } from "../core/type.request";

class CommentController {
    createComment = async(req:Request,res:Response,next:NextFunction)=>{
        return Created.create({
            message:'create comment success',
            metadata:await CommentService.createComment(req.body)
        }).send(res)
    }
    getComment = async(req:Request<any,any,any,GetCommentRequest>,res:Response,next:NextFunction)=>{
        return Ok.create({
            message:'get comment success',
            metadata:await CommentService.getComment(req.query)
        }).send(res)
    }
    delComment = async(req:Request<any,any,DeleteCommentRequest,any>,res:Response,next:NextFunction)=>{
        return Ok.create({
            message:'get comment success',
            metadata:await CommentService.delComment(req.body)
        }).send(res)
    }
}
export default new CommentController