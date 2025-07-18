export interface IUserPayload {
  name: string
  email: string
  password: string
}

export interface IUser extends IUserPayload {
  _id: string
  created_at: Date
}

export interface IUserResponse extends Omit<IUserPayload, 'password'> {
  id: string
}

export interface IUserLoginPayload extends Omit<IUserPayload, 'name'> {}
