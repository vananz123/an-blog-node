import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
const app = express();
const morgan = require('morgan');
const cors = require('cors');
//const {defaulf: helmet} = require('helmet')
const compression = require('compression');
import instanceMongodb from './databases/init.mongodb';
import routers from './routers';
import { ErrorResponse } from './core/error.response';
//const {checkOverLoad} = require('./helpers/check.connect')
import { COROS_OPTIONS } from '@/constants';

app.use(cors(COROS_OPTIONS));
app.use(morgan('dev'));
//app.use(helmet())
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
//checkOverLoad()
//init db
instanceMongodb;
//router
app.use('/', routers);
//handle error
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorResponse('Not found!', 404);
  return next(error);
});
app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal Server Error',
    detail: error.detail,
  });
});
export default app;
