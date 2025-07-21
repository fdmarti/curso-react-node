import { Books, IBooksDocument } from '../schema/BooksSchema'
import { IBooks, IBooksPayload } from '../types/Books/IBooks'

export const BooksModel = {
  async getAll (): Promise<IBooksDocument[]> {
    return await Books.find()
  },

  async getMyBooks (userId: string): Promise<IBooksDocument[]> {
    return await Books.find({ user_id: userId })
  },

  async getById (_id: string): Promise<IBooksDocument | null> {
    return await Books.findById({ _id })
  },

  async create (params: IBooksPayload): Promise<IBooksDocument> {
    const newBook = new Books(params)
    return await newBook.save()
  },

  async update (params: IBooks): Promise<IBooksDocument | null> {
    const { id, created_at: createdAt, ...restBook } = params
    return await Books.findByIdAndUpdate(id, restBook, { new: true })
  },

  async delete (_id: string): Promise<boolean> {
    const result = await Books.deleteOne({ _id })
    return result.deletedCount === 1
  }

}
