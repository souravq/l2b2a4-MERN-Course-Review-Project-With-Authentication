import { z } from 'zod'

const registerUserZodSchema = z.object({
  username: z.string({ required_error: 'Username is required.' }),
  email: z.string({ required_error: 'Email is required.' }),
  password: z.string({ required_error: 'Password is required.' }),
  passwordHistory: z.array(z.string()).optional(),
  role: z.enum(['user', 'admin']).optional(),
})

export default registerUserZodSchema
