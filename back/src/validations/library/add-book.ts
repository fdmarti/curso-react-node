import * as z from 'zod'
import { ILibraryPayload } from '../../types/Library/ILibrary'

export const LibraryAddSchema: z.ZodType<ILibraryPayload> = z.object({
  bookId: z.string('You should have a valid book.'),
  userId: z.string('You should have a valid user.')
})
