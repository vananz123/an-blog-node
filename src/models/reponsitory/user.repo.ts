import { convertToObjectIdMongodb } from '../../utils';
import { Roles } from '../../constants';
import userModel from '../user.model';
import { findRoleBySlug } from './role.repo';
import slugify from 'slugify';
function randomFourDigits() {
  return Math.floor(1000 + Math.random() * 9000);
}
export const newUser = async ({ usr_name,usr_avatar="", usr_email, usr_password }: { usr_name: string; usr_email: string; usr_password: string ;usr_avatar?:string}) => {
  const role = await findRoleBySlug(Roles.USER);
  if (!role) return null;
  const slug = `@${slugify(usr_name, {
    replacement: '-', 
    remove: undefined, 
    lower: true  
  })}${randomFourDigits().toString()}`
  return await userModel.create({
    usr_id: 1111,
    usr_slug: slug,
    usr_name: usr_name,
    usr_avatar:usr_avatar ,
    usr_email: usr_email,
    usr_password: usr_password,
    usr_role: role?._id,
  });
};
interface ISelectUser {
  usr_name: number;
  usr_password?: number;
  usr_email: number;
  usr_avatar:number;
  usr_status: number;
  usr_slug:number;
}
export const findById = async (id: string) => {
  return await userModel.findOne({ _id: convertToObjectIdMongodb(id) }).lean();
};
export const findByEmail = async ({
  email,
  select = { usr_slug:1, usr_name: 1,  usr_email: 1, usr_password: 2,usr_avatar:1, usr_status: 1  },
}: {
  email: string;
  select?: ISelectUser;
}) => {
  return await userModel
    .findOne({ usr_email: email })
    .select({ ...select })
    .lean();
};
