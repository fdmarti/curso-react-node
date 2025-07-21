import { Request, Response } from 'express'
import { LibraryAddSchema } from '../validations/library/add-book'
import { responseCustomError } from '../utils/custom-error'
import { LibraryModel } from '../models/library'
import { ILibraryPayload } from '../types/Library/ILibrary'
import { LibraryStatus } from '../enums/Library'
import { IJwTVerify } from '../types/User/Jwt'
import { LibraryDTO } from '../dtos/LibraryDTO'

export const addBook = async (req: Request, res: Response): Promise<Response> => {
  const { success, data, error } = LibraryAddSchema.safeParse(req.body)

  if (!success) {
    return res
      .status(400)
      .json({ success: false, message: error.issues[0].message })
  }

  const user = req.user as IJwTVerify

  try {
    const LibraryExists = await LibraryModel.searchIfExists({ userId: user.id, bookId: data.bookId })

    if (LibraryExists.length > 0) {
      return res
        .status(406)
        .json({ success: false, message: 'You already have this book in your library.' })
    }

    const newLibrary: ILibraryPayload = {
      bookId: data.bookId,
      userId: user.id,
      status: LibraryStatus.TO_READ
    }

    const librarySaved = await LibraryModel.add(newLibrary)
    // @ts-expect-error
    const library = LibraryDTO(librarySaved)

    return res.status(201).json({
      success: true,
      library
    })
  } catch (error) {
    console.error(error)
    return responseCustomError(res)
  }
}

export const getUserLibrary = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user as IJwTVerify

  try {
    const userLibrary = await LibraryModel.getAll(user.id)
    // @ts-expect-error
    const libraryUpdate = userLibrary.map(lib => LibraryDTO(lib))

    return res.status(201).json({
      success: true,
      library: libraryUpdate
    })
  } catch (error) {
    console.error(error)
    return responseCustomError(res)
  }
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  const libraryId = req.params.id
  const user = req.user as IJwTVerify

  try {
    const currentLibrary = await LibraryModel.getById(libraryId)

    if (currentLibrary === null || currentLibrary === undefined) {
      return res
        .status(404)
        .json({ success: false, message: 'Library not found.' })
    }

    if (currentLibrary.userId.toString() !== user.id) {
      return res
        .status(403)
        .json({ success: false, message: 'Error updating the library.' })
    }

    const { status } = req.body

    console.log(status, libraryId)

    const userLibrary = await LibraryModel.update(libraryId, status)

    if (userLibrary === null || userLibrary === undefined) {
      return res
        .status(406)
        .json({ success: false, message: 'Error saving the new status.' })
    }
    // @ts-expect-error
    const library = LibraryDTO(userLibrary)

    return res.status(200).json({
      success: true,
      library
    })
  } catch (error) {
    console.error(error)
    return responseCustomError(res)
  }
}

export const deleteLibrary = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const libraryId = req.params.id
  const user = req.user as IJwTVerify

  try {
    const currentLibrary = await LibraryModel.getById(libraryId)

    if (currentLibrary === null || currentLibrary === undefined) {
      return res
        .status(404)
        .json({ success: false, message: 'Library not found.' })
    }

    if (currentLibrary.userId.toString() !== user.id) {
      return res
        .status(403)
        .json({ success: false, message: 'Error updating the library.' })
    }

    await LibraryModel.delete(libraryId)

    return res
      .status(200)
      .json({ success: true, message: 'Library deleted successfully.' })
  } catch (error) {
    return responseCustomError(res)
  }
}
