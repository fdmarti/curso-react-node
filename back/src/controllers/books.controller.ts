import { Request, Response } from 'express'
import { BookSaveSchema } from '../validations/books/create'
import { BooksModel } from '../models/books'
import { IBooks, IBooksPayload } from '../types/Books/IBooks'
import { BookDTO } from '../dtos/BookDTO'
import { IJwTVerify } from '../types/User/Jwt'
import { responseCustomError } from '../utils/custom-error'

export const getAll = async (
  _: Request,
  res: Response
): Promise<Response> => {
  try {
    const books = await BooksModel.getAll()
    const booksEdited = books.map((book) => BookDTO(book))

    return res.status(200).json({
      success: true,
      books: booksEdited
    })
  } catch (error) {
    return responseCustomError(res)
  }
}

export const getMyBooks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = req.user as IJwTVerify

  try {
    const books = await BooksModel.getMyBooks(user.id)
    const booksEdited = books.map((book) => BookDTO(book))

    return res.status(200).json({
      success: true,
      books: booksEdited
    })
  } catch (error) {
    return responseCustomError(res)
  }
}

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params

  try {
    const book = await BooksModel.getById(id)

    if (book === null) {
      throw new Error('Books does not exists.')
    }

    return res.status(200).json({
      success: true,
      books: BookDTO(book)
    })
  } catch (error) {
    return responseCustomError(res)
  }
}
export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { success, error } = BookSaveSchema.safeParse(req.body)

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: error.issues[0].message })
  }

  const user = req.user as IJwTVerify

  try {
    const newBook: IBooksPayload = {
      user_id: user.id,
      ...req.body
    }
    const bookSaved = await BooksModel.create(newBook)
    const book = BookDTO(bookSaved)

    return res.status(201).json({
      success: true,
      book
    })
  } catch (error) {
    return responseCustomError(res)
  }
}

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { success, error } = BookSaveSchema.safeParse(req.body)

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: error.issues[0].message })
  }

  const user = req.user as IJwTVerify
  const { id } = req.params
  try {
    const currentBook = await BooksModel.getById(id)

    if (
      currentBook === null ||
      currentBook === undefined ||
      currentBook.user_id === undefined
    ) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found.' })
    }

    const currentBookUserId = currentBook.user_id.toString()

    if (currentBookUserId !== user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this book.'
      })
    }

    const editedBook: IBooks = {
      ...req.body,
      id,
      user_id: currentBook.user_id
    }

    const bookSaved = await BooksModel.update(editedBook)

    if (bookSaved == null) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found or not updated.' })
    }

    const book = BookDTO(bookSaved)

    return res.status(200).json({
      success: true,
      book
    })
  } catch (error) {
    return responseCustomError(res)
  }
}

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = req.user as IJwTVerify
  const { id } = req.params

  try {
    const currentBook = await BooksModel.getById(id)

    if (
      currentBook === null ||
      currentBook === undefined ||
      currentBook.user_id === undefined
    ) {
      return res
        .status(404)
        .json({ success: false, message: 'Book not found.' })
    }

    const currentBookUserId = currentBook.user_id.toString()

    if (currentBookUserId !== user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized.' })
    }

    await BooksModel.delete(id)

    return res
      .status(200)
      .json({ success: true, message: 'Book deleted successfully.' })
  } catch (error) {
    return responseCustomError(res)
  }
}
