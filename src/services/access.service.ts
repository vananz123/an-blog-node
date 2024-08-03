import userModel from "../models/user.model";
import keyTokenService from "../services/keyToken.service";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Roles } from "../constants";
import { createTokenPiar } from "../auth/authUtils";
// interface IAccessSerVice {
//   sginUp: ({
//     name,
//     email,
//     password,
//   }: {
//     name: String;
//     email: String;
//     password: String;
//   }) => void;
// }
class AccessService {
  static sginUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const holderUser = await userModel.findOne({ email }).lean();

      if (holderUser) {
        return {
          code: "xxxx",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        name,
        email,
        password: passwordHash,
        roles: [Roles.USER],
      });
      if (newUser != null) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });
        const userId = newUser._id;
        const publicKeyString = await keyTokenService.createKeyToken({
          userId,
          publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "xxxx",
          };
        }
        const publicKeyObject = crypto.createPublicKey(publicKeyString)
        const tokens = await createTokenPiar(
          { userId: newUser._id, email },
          publicKeyObject,
          privateKey,
        );
        return {
          code:201,
          metadata:{
            newUser
          },
          tokens
        }
      }
      return {
        code:200,
        metadata:null,
      }
    } catch (error) {}
  };
}
export default AccessService;
