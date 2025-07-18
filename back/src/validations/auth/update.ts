import * as z from 'zod'

export const AuthUpdateSchema: z.ZodType<{ name: string }> = z.object({
  name: z
    .string('Invalid name')
    .min(3, 'The name should have more than 3 letters.')
})
