import { Schema, SchemaType, Types } from 'mongoose';
import keyTokenModel from '../models/keytoken.model';
import { update } from 'lodash';
class KeyTokenService {
  static createKeyToken = async ({
    userId,
    privateKey,
    publicKey,
    refreshToken,
  }: {
    userId?: Types.ObjectId;
    privateKey: string;
    publicKey: string;
    refreshToken?: string;
  }) => {
    // const tokens = await keyTokenModel.create({
    //   user: userId,
    //   privateKey: privateKey,
    //   publicKey: publicKey,
    // });
    // return tokens ? {privateKey, publicKey} : undefined
    try {
      const filter = { user: userId },
        update = { privateKey, publicKey, refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true };
      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
  static findByUserId = async(userId:string)=>{
    return await keyTokenModel.findOne({user:new Types.ObjectId(userId)})
  }
  static deleteKeyById = async(id:Types.ObjectId)=>{
    return await keyTokenModel.deleteOne({_id:new Types.ObjectId(id)})
  }
  static findByRefreshToken = async(refreshToken:string)=>{
    return await keyTokenModel.findOne({refreshToken:refreshToken})
  }
  static findByRefreshTokenUsed = async(refreshToken:string)=>{
    return await keyTokenModel.findOne({refreshTokensUsed:refreshToken}).lean()
  }
  static deleteByUserId = async(userId:string)=>{
    return await keyTokenModel.deleteOne({user:userId})
  }
}
export default KeyTokenService;

