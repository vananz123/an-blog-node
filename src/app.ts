import express, { NextFunction, Request, Response } from "express"
const app = express()
const morgan = require('morgan')
const cors = require('cors')
//const {defaulf: helmet} = require('helmet')
const compression = require('compression')
import instanceMongodb from "./databases/init.mongodb"
import routers from "./routers"
import { ErrorResponse } from "./core/error.response"
//const {checkOverLoad} = require('./helpers/check.connect')

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(morgan('dev'))
//app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
//checkOverLoad()
//init db
instanceMongodb
//router
app.use('/',routers)
//handle error
app.use((req:Request, res:Response,next:NextFunction)=>{
    const error = new ErrorResponse('Not found!',404)
    return next(error) 
})
app.use((error:ErrorResponse, req:Request, res:Response,next:NextFunction)=>{
   const statusCode =error.status || 500;
   return res.status(statusCode).json({
    status:'error',
    code:statusCode,
    message:error.message || "Internal Server Error"
   })
})
export default app;