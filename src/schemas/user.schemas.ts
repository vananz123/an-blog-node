import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});
export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(4),
});
export const userUpdateShema = z.object({
  name: z.string(),
  salf: z.string(),
  phone: z.string(),
  sex: z.string(),
  avatar: z.string(),
  date_of_birth: z.date(),
})