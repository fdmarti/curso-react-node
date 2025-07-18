import jwt from 'jsonwebtoken'
import { IUserResponse } from '../types/User/IUser'
import { IJwTVerify } from '../types/User/Jwt'

const JWT_KEY = process.env.JWT_KEY ?? 'Esta-es-una-clave-por-las-dudas'

export const JwT = {
  generate (payload: IUserResponse): string {
    return jwt.sign(payload, JWT_KEY, { expiresIn: '2hr' })
  },

  verify (token: string): IJwTVerify {
    const decoded = jwt.verify(token, JWT_KEY)

    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload')
    }

    return decoded as IJwTVerify
  }
}
