import { IBooksDocument } from '../schema/BooksSchema'
import { IBooks } from '../types/Books/IBooks'

export const BookDTO = (bookDocument: IBooksDocument): IBooks => {
  const { __v: _, _id: id, ...rest } = bookDocument.toObject()

  return {
    id,
    ...rest
  }
}
