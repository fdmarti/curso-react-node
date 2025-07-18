import { model, Schema } from 'mongoose'

export const AuthSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now() }
})

export const Auth = model('Users', AuthSchema)
