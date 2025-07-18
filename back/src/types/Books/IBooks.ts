import { Types } from 'mongoose'

export interface IBooksPayload {
  title: string
  author: string
  publisher: string
  pages: number
  description: string
  website: string
  user_id?: Types.ObjectId
}

export interface IBooks extends IBooksPayload {
  id: string
  created_at: Date
}
