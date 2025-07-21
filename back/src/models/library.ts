import { LibraryStatus } from '../enums/Library'
import { Library } from '../schema/LibrarySchema'
import { ILibraryPayload } from '../types/Library/ILibrary'

export const LibraryModel = {
  async getAll (userId: string) {
    return await Library.find({ userId })
  },

  async getById (LibraryId: string) {
    return await Library.findById({ _id: LibraryId })
  },

  async searchIfExists (params: ILibraryPayload) {
    const { bookId, userId } = params
    return await Library.find({ userId, bookId })
  },

  async update (libraryId: string, status: LibraryStatus) {
    return await Library.findByIdAndUpdate(
      libraryId,
      {
        status,
        updated_at: Date.now()
      },
      { new: true }
    )
  },

  async add (params: ILibraryPayload) {
    const newLibrary = new Library(params)
    return await newLibrary.save()
  },

  async delete (_id: string): Promise<boolean> {
    const result = await Library.deleteOne({ _id })
    return result.deletedCount === 1
  }
}
