import { Request, Response } from 'express'
import { BookSaveSchema } from '../validations/books/create'
import { IJwTVerify } from '../types/User/Jwt'
import { BooksModel } from '../models/books'
import { IBooksPayload } from '../types/Books/IBooks'
import { BookDTO } from '../dtos/BookDTO'

declare module 'express' {
  interface Request {
    user?: IJwTVerify
  }
}

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  if (req.user === null || req.user === undefined) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid user.' })
  }
  try {
    const books = await BooksModel.getAll()
    const booksEdited = books.map(book => BookDTO(book))

    return res
      .status(200)
      .json({
        success: true,
        books: booksEdited
      })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
export const getById = async (req: Request, res: Response): Promise<Response> => {
  if (req.user === null || req.user === undefined) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid user.' })
  }

  const { id } = req.params

  try {
    const book = await BooksModel.getById(id)

    if (book === null) {
      throw new Error('Books does not exists.')
    }

    return res
      .status(200)
      .json({
        success: true,
        books: BookDTO(book)
      })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
export const create = async (req: Request, res: Response): Promise<Response> => {
  const { success, error } = BookSaveSchema.safeParse(req.body)

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: error.issues[0].message })
  }

  if (req.user === null || req.user === undefined) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid user.' })
  }

  try {
    const newBook: IBooksPayload = {
      user_id: req.user.id,
      ...req.body
    }
    const book = await BooksModel.create(newBook)

    return res
      .status(201)
      .json({
        success: true,
        book
      })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
