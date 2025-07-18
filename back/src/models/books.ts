import { Books, IBooksDocument } from '../schema/BooksSchema'
import { IBooks, IBooksPayload } from '../types/Books/IBooks'

export const BooksModel = {
  async getAll (): Promise<IBooksDocument[]> {
    return await Books.find()
  },

  async getById (_id: string): Promise<IBooksDocument | null> {
    return await Books.findById({ _id })
  },

  async create (params: IBooksPayload): Promise<IBooks> {
    const newBook = new Books(params)
    const savedBook = await newBook.save()

    const { __v: valu, _id, ...rest } = savedBook.toObject()

    const result: IBooks = {
      ...rest,
      id: savedBook._id.toString()
    }

    return result
  }

}
