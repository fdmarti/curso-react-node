import * as z from 'zod'
import { IUserPayload } from '../../types/User/IUser'

export const AuthRegisterSchema: z.ZodType<IUserPayload> = z.object({
  email: z.email('Invalid Email'),
  name: z
    .string('Invalid name')
    .min(3, 'The name should have more than 3 letters.'),
  password: z.string('Invalid Password').trim().min(5)
})
