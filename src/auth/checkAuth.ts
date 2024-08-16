import { NextFunction, Request, Response } from 'express';
import { HEADER } from '../constants';
import { findById } from '../services/apikey.service';
import { ApiKeyRequest } from '../core/type.request';
export const apiKey = async (req: ApiKeyRequest, res: Response, next: NextFunction) => {
  try {
    // const newApi = await apiKeyModel.create({key:crypto.randomBytes(32).toString('hex'),status:true, permissions:['0000']})
    // console.log(newApi)
    const key = req.headers[HEADER.API_KEY]?.toString();
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
    req.objKey = objKey;
    return next();
  } catch (error) {
    return res.status(500).json({
      mess: 'error',
    });
  }
};
export const permissions = ({ permissions }: { permissions: string }) => {
  return (req: ApiKeyRequest, res: Response, next: NextFunction) => {
    if (!req.objKey?.permissions) {
      return res.status(403).json({
        mess: 'permissions dinier',
      });
    }
    const validPermission = req.objKey.permissions.includes(permissions);
    if (!validPermission) {
      return res.status(403).json({
        mess: 'permissions dinier',
      });
    }
    return next();
  };
};
