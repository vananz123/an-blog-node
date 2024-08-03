import { Types } from "mongoose"

const keyTokenModel = require('../models/keytoken.model')
class KeyTokenService {
    static createKeyToken = async({userId,publicKey}:{userId:Types.ObjectId,publicKey:any})=>{
        try{
            const publicKeyString = publicKey.toString()
            const tokens = await keyTokenModel.create({
                user:userId,publicKey:publicKeyString
            })
            if(tokens){
                return publicKeyString
            }
            return ''
        }catch(error){
            return error
        }
    }
}
export default KeyTokenService;