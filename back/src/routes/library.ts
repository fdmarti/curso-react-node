import express from 'express'
import * as libraryController from '../controllers/library.controller'
import { verifyToken } from '../middleware/authenticaded'

const libraryRoutes = express.Router()

libraryRoutes.get('/', verifyToken, libraryController.getUserLibrary)
libraryRoutes.post('/', verifyToken, libraryController.addBook)
libraryRoutes.put('/:id', verifyToken, libraryController.update)
libraryRoutes.delete('/:id', verifyToken, libraryController.deleteLibrary)

export default libraryRoutes
