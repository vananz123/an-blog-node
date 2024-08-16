import roleModel from "../role.model";
export const findRoleBySlug = (slug:string)=>{
    return roleModel.findOne({rol_slug:slug}).lean()
}
export const findRoleByName = (name:string)=>{
    return roleModel.findOne({rol_name:name}).lean()
}