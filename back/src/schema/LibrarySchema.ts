import { Document, model, Schema } from 'mongoose'
import { ILibraryPayload } from '../types/Library/ILibrary'

export interface ILibraryDocument extends ILibraryPayload, Document {
  created_at: Date
  updated_at: Date
  _id: string
  __v: number
}

export const LibrarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  bookId: { type: Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ['to_read', 'read'],
    default: 'to_read'
  },

  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now() }
})

export const Library = model('Libraries', LibrarySchema)
