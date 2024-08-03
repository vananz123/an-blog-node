import express from "express"
const app = express()
const morgan = require('morgan')
//const {defaulf: helmet} = require('helmet')
const compression = require('compression')
import instanceMongodb from "./databases/init.mongodb"
const {checkOverLoad} = require('./helpers/check.connect')
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
app.use('/',require('./routers'))
export default app;