import apiKeyModel from "../models/apiKey.model"
export const findById = async(key:string)=>{
    const apiKey = await apiKeyModel.findOne({key:key,status:true}).lean()
    return apiKey
}