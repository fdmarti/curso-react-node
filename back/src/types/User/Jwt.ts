import { JwtPayload } from 'jsonwebtoken'

export interface IJwTVerify extends JwtPayload {
  name: string
  email: string
  id: string
  iat: number
  exp: number
}
