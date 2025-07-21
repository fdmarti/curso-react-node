import { Response, Request } from 'express'
import {
  AuthRegisterSchema,
  AuthLoginSchema,
  AuthUpdateSchema
} from '../validations/auth'
import { Auth } from '../schema/AuthSchema'
import { Bcryp } from '../utils/bcrypt'
import { JwT } from '../utils/jwt'
import { AuthModel } from '../models/auth'

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { success, error, data } = AuthRegisterSchema.safeParse(req.body)

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: error.issues[0].message })
    }

    const { name, email, password } = data
    const userExists = await Auth.findOne({ email }).exec()

    if (userExists !== null) {
      return res
        .status(401)
        .json({ success: false, message: 'User already exists.' })
    }

    const hashed = await Bcryp.hashPassword(password)
    const user = await AuthModel.create({
      email,
      name,
      password: hashed
    })

    const token = JwT.generate(user)

    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(201)
      .json({
        success: true,
        user,
        token
      })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  try {
    const { success, error } = AuthLoginSchema.safeParse(req.body)

    if (!success) {
      return res
        .status(400)
        .json({ success: false, message: error.issues[0].message })
    }

    const userExists = await AuthModel.getByEmail(email)
    if (userExists === null) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials.' })
    }

    const isValidPassword = await Bcryp.comparePassword(
      password,
      userExists.password
    )

    if (!isValidPassword) {
      return res
        .status(403)
        .json({ success: false, message: 'Invalid credentials.' })
    }

    const user = {
      name: userExists.name,
      email: userExists.email,
      id: userExists._id
    }
    const token = JwT.generate(user)

    return res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json({
        success: true,
        user,
        token
      })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.body

  const { success, error } = AuthUpdateSchema.safeParse(req.body)

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: error.issues[0].message })
  }

  try {
    const token: string = req.cookies.access_token
    const data = JwT.verify(token)

    const { id } = data
    const status = await AuthModel.update(id, name)
    return res.status(201).json(status)
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const logout = async (_: Request, res: Response): Promise<Response> => {
  return res
    .clearCookie('access_token')
    .json({ success: true, message: 'Logged out successfully' })
}
