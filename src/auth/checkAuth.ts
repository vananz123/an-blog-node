import { NextFunction, Request, Response } from 'express';
import { HEADER } from '../constants';
import { findById } from '../services/apikey.service';
import { MiddlewaresRequest } from '@/core/type.request';
import { UserDecode } from './jwtUtils';
export const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const newApi = await apiKeyModel.create({key:crypto.randomBytes(32).toString('hex'),status:true, permissions:['0000']})
    // console.log(newApi)
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log(key);
    if (!key) {
      return res.status(403).json({
        mess: 'Forbidden Error',
      });
    }
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        mess: 'Forbidden Error not found',
      });
    }
    Object.assign(req, { objKey: objKey });
    //req.objKey = objKey;
    return next();
  } catch (error) {
    return res.status(500).json({
      mess: 'error',
    });
  }
};
export const permissions = ({ permissions }: { permissions: string }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!('objKey' in req)) return;

    const objKey = req.objKey as object;

    if (!('permissions' in objKey)) return;

    if (!objKey['permissions']) {
      return res.status(403).json({
        mess: 'permissions dinier',
      });
    }
    const objKeypermissions = objKey.permissions as Array<string>
    const validPermission = objKeypermissions.includes(permissions);
    if (!validPermission) {
      return res.status(403).json({
        mess: 'permissions dinier',
      });
    }
    return next();
  };
};
