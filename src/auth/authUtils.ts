import { KeyObject } from "crypto"
import JWT from "jsonwebtoken"
export const createTokenPiar = async(payload:string | Buffer | object, publicKey:KeyObject,privateKey:KeyObject | string)=>{
    try {
        //accessToken
        const accessToken = await JWT.sign(payload,privateKey,{
            algorithm:'RS256',
            expiresIn:'2 days'
        })
        const refreshToken = await JWT.sign(payload,privateKey,{
            algorithm:'RS256',
            expiresIn:'2 days'
        })
        JWT.verify(accessToken,publicKey,(error,decode)=>{
            if(error){
                console.log('error verify',error)
            }else{
                console.log('verify',decode)
            }
        })
        return {accessToken,refreshToken}
    } catch (error) {
        
    }
}