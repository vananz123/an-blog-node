import { asyncHandler } from '../helpers/asyncHandler';
import { KeyObject } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { HEADER } from '../constants';
import { ApiKeyRequest } from '../core/type.request';
import { AuthFailureError, NotFoundError } from '../core/error.response';
import KeyTokenService from '../services/keyToken.service';
import {verifyJWT} from './jwtUtils'
export const createTokenPiar = async (payload: string | Buffer | object, privateKey: KeyObject | string, publicKey: KeyObject | string) => {
  try {
    //accessToken
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });
    JWT.verify(accessToken, publicKey, (error, decode) => {
      if (error) {
        console.log('error verify', error);
      } else {
        console.log('verify', decode);
      }
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {}
};
export const authentication = asyncHandler(async (req: ApiKeyRequest, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string;
  if (!userId) throw new AuthFailureError('Invalid Request');
  const keyStore = await KeyTokenService.findByUserId(userId);

  if (!keyStore) throw new NotFoundError('Not Found Request');
  const refreshToken = req.headers[HEADER.REFRESHTOKEN] as string;
  console.log(refreshToken)
  if (refreshToken) {
    try {
      const decodeUser =await verifyJWT(refreshToken, keyStore.privateKey);
      
      if (userId !== decodeUser.userId) {
        throw new AuthFailureError('Invalid user');
      }
      req.user = decodeUser
      req.refreshToken = refreshToken
      req.keyStore = keyStore;
      return next();
    } catch (error) {
      throw error;
    }
  }
  const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
  if (!accessToken) throw new AuthFailureError('Invalid Request');
  try {
    const decodeUser =await verifyJWT(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId) {
      throw new AuthFailureError('Invalid user');
    }
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});
