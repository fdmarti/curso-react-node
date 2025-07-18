import Express from 'express'
import * as BooksController from '../controllers/books.controller'
import { verifyToken } from '../middleware/authenticaded'

const booksRouter = Express.Router()

booksRouter.get('/', verifyToken, BooksController.getAll)
booksRouter.get('/:id', verifyToken, BooksController.getById)
booksRouter.post('/', verifyToken, BooksController.create)

export default booksRouter
