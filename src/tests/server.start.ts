'use strict'
const router = require('express').Router()
import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../helpers/asyncHandler'
import { Ok } from '../core/success.response'

router.get('/status',asyncHandler((req:Request,res:Response,next:NextFunction)=>{
    return Ok.create({
        message:"Server start succses",
        metadata:{
            status:'OK bady!!! ffff'
        }
    }).send(res)
}))
export default router