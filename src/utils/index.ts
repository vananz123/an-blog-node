import _ from 'lodash';
import { Types } from 'mongoose';
import crypto from 'crypto'
export const getIntoData = ({ fileds = [], object = {} }:{fileds:Array<string>;object:Object}) => {
  return _.pick(object, fileds);
};
export const convertToObjectIdMongodb = (id:string) => {
  const newId= new Types.ObjectId(id)
  return newId
}
export const removeUnderfinedObject = (obj:any)=>{
  Object.keys(obj).forEach( (k) => {
    if(obj[k] == null){
      delete obj[k]
    }
  })
  return obj
}
/**
{
  a:{
   b:1
   c:2
  }
  mongofb.updateOne({
    'a.b':1,
    'a.c' : 2
  })
}
**/
export const updateNestedObjectParser = (obj:any)=> {
  const final:any ={}
  Object.keys(obj).forEach( k=>{
    if(typeof obj[k] === 'object' && !Array.isArray(obj[k])){
      const res = updateNestedObjectParser(obj[k])
      Object.keys(res).forEach(a => {
        final[`${k}.${a}`] = res[a]
      })
    }else{
      final[k] = obj[k]
    }
  })
  return final
}
export const nameFileRamdom = ()=> crypto.randomBytes(16).toString('hex')