import { NextFunction, Request, Response } from 'express'
import { JwT } from '../utils/jwt'
import { IJwTVerify } from '../types/User/Jwt'

declare module 'express' {
  interface Request {
    user?: IJwTVerify
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.cookies?.access_token

  if (token === undefined) {
    return res
      .status(403)
      .json({ success: false, message: 'Access denied.' })
  }

  try {
    const decoded = JwT.verify(token)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
