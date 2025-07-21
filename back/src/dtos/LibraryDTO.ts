import { ILibraryDocument } from '../schema/LibrarySchema'
import { ILibrary } from '../types/Library/ILibrary'

export const LibraryDTO = (libraryDocument: ILibraryDocument): ILibrary => {
  const { __v: _, _id: id, userId, ...rest } = libraryDocument.toObject()

  return {
    id,
    ...rest
  }
}
