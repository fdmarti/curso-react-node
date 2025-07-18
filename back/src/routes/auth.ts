import express from 'express'
import * as AuthController from '../controllers/auth.controller'
import { verifyToken } from '../middleware/authenticaded'

const authRouter = express.Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.put('/user', verifyToken, AuthController.updateUser)
authRouter.post('/logout', verifyToken, AuthController.logout)

export default authRouter
