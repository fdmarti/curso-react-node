import { Auth } from '../schema/AuthSchema'
import {
  IUserResponse,
  IUserPayload,
  IUser
} from '../types/User/IUser'

export const AuthModel = {
  async create (params: IUserPayload): Promise<IUserResponse> {
    const { email, name, password } = params
    const newUser = new Auth({ email, name, password })
    const savedUser = await newUser.save()
    return {
      email: savedUser.email,
      id: savedUser.id,
      name: savedUser.name
    }
  },

  async getByEmail (email: string): Promise<IUser | null> {
    return await Auth.findOne({ email })
  },

  async update (id: string, payload: string): Promise<IUserResponse | boolean> {
    const editedUser = await Auth.findByIdAndUpdate(id, { name: payload }, { new: true })
    if (editedUser == null) return false
    return {
      email: editedUser.email,
      id: editedUser.id,
      name: editedUser.name
    }
  }
}
