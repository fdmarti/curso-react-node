import { Response } from 'express'

export const responseCustomError = (res: Response): Response => {
  return res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
}
