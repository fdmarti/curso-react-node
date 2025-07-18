import * as z from 'zod'
import { IUserLoginPayload } from '../../types/User/IUser'

export const AuthLoginSchema: z.ZodType<IUserLoginPayload> = z.object({
  email: z.email('Invalid Email'),
  password: z.string('Invalid Password').trim().min(5)
})
