import userModel from '../models/user.model';
import keyTokenService from '../services/keyToken.service';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { Roles } from '../constants';
import { createTokenPiar } from '../auth/authUtils';
import { UserDecode, verifyJWT } from '../auth/jwtUtils';
import { getIntoData } from '../utils';
import { AuthFailureError, BadRequestError, ConflictRequestError, ForbiddenError } from '../core/error.response';
import { findByEmail } from '../models/reponsitory/user.repo';
import { UserLoginRequset, UserSignUpRequset } from '../core/type.request';
import { Types } from 'mongoose';
import { newUser as createUser } from '../models/reponsitory/user.repo';
class AccessService {
  static refreshToken = async ({
    keyStore,
    user,
    refreshToken,
  }: {
    keyStore: any;
    user: UserDecode | undefined;
    refreshToken: string | undefined;
  }) => {
    // check token used
    if (!user) throw new AuthFailureError('user not register');
    console.log(keyStore);
    const { userId, email } = user;
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await keyTokenService.deleteByUserId(userId);
      console.log('used with token used', { userId, email });
      throw new ForbiddenError('Something wrong things !! Please relogin');
    }
    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('user not register');
    const foundUser = await findByEmail({ email });
    if (!foundUser) throw new AuthFailureError('user not register');
    const tokens = await createTokenPiar({ userId: foundUser._id, email: foundUser.usr_email }, keyStore.privateKey, keyStore.publicKey);
    await keyStore.updateOne({
      $set: { refreshToken: tokens?.refreshToken },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });
    return {
      user: { userId, email },
      tokens,
    };
  };
  static logout = async (keyStoreId: Types.ObjectId | undefined) => {
    if (!keyStoreId) {
      throw new AuthFailureError('Invalid Requset');
    }
    return await keyTokenService.deleteKeyById(keyStoreId);
  };
  static login = async (request: UserLoginRequset) => {
    //find user

    const user = await findByEmail({ email: request.email });
    //match password

    if (user) {
      const match = bcrypt.compareSync(request.password, user.usr_password);
      if (match === false) {
        throw new AuthFailureError('UnAuthrization!');
      }
      //create tokens
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');
      const { _id } = user;
      const tokens = await createTokenPiar({ userId: _id, email: request.email }, privateKey, publicKey);

      if (!tokens) {
        throw new ConflictRequestError('Error: tokens');
      }
      await keyTokenService.createKeyToken({
        userId: user._id,
        privateKey,
        publicKey,
        refreshToken: tokens.refreshToken,
      });
      return {
        user: getIntoData({ fileds: ['_id', 'name', 'email'], object: user }),
        tokens,
      };
    } else {
      throw new BadRequestError('User not register!');
    }
  };
  static sginUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const holderUser = await userModel.findOne({ usr_email: email }).lean();
    if (holderUser) {
      throw new BadRequestError('Error: email was exited');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({ usr_name: name, usr_email: email, usr_password: passwordHash });
    if (newUser != null) {
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');
      const tokens = await createTokenPiar({ userId: newUser._id, email }, privateKey, publicKey);
      if (!tokens) {
        throw new ConflictRequestError('Error: tokens');
      }
      const publicKeyString = await keyTokenService.createKeyToken({
        userId: newUser._id,
        privateKey,
        publicKey,
      });
      if (!publicKeyString) {
        throw new ConflictRequestError('Error: not create db');
      }
      return {
        user: getIntoData({ fileds: ['_id', 'usr_name', 'usr_email'], object: newUser }),
        tokens,
      };
    }
    return null;
  };
}
export default AccessService;
