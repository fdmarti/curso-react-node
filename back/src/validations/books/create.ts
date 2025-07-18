import * as z from 'zod'
import { IBooksPayload } from '../../types/Books/IBooks'

export const BookSaveSchema: z.ZodType<IBooksPayload> = z.object({
  title: z
    .string('The book should have a valid title'),
  author: z.string('The book should have a valid author'),
  description: z.string('The book should have a description').min(10).max(1000),
  pages: z.number('The book should enter a valid number of pages').positive(),
  published: z.string('The book should have a valid published date'),
  publisher: z.string('The book should have a valid publisher'),
  website: z.url('The book should have a valid URL')
})
