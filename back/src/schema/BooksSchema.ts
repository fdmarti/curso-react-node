import { Document, model, Schema } from 'mongoose'
import { IBooksPayload } from '../types/Books/IBooks'

export interface IBooksDocument extends IBooksPayload, Document {
  created_at: Date
  _id: string
  __v: number
}

export const BooksSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  pages: { type: Number, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  user_id: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

export const Books = model<IBooksDocument>('Books', BooksSchema)
