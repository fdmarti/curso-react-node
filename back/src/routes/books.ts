import Express from 'express'
import * as BooksController from '../controllers/books.controller'
import { verifyToken } from '../middleware/authenticaded'

const booksRouter = Express.Router()

booksRouter.get('/', verifyToken, BooksController.getAll)
booksRouter.get('/my-books', verifyToken, BooksController.getMyBooks)
booksRouter.get('/:id', verifyToken, BooksController.getById)
booksRouter.post('/', verifyToken, BooksController.create)
booksRouter.put('/:id', verifyToken, BooksController.update)
booksRouter.delete('/:id', verifyToken, BooksController.deleteBook)

export default booksRouter
