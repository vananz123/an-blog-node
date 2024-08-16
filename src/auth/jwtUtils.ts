import JWT from 'jsonwebtoken';
export interface UserDecode {
  userId: string;
  email: string;
}
export const verifyJWT = async (token: string, keySercet: string) => {
  const decode = JWT.verify(token, keySercet) as UserDecode;
  console.log(decode);
  return decode;
};
