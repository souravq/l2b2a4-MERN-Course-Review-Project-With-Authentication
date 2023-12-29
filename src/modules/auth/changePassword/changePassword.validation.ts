import { z } from 'zod'

const changePasswordZodSchema = z.object({
  currentPassword: z.string({ required_error: 'Current Password is required' }),
  newPassword: z.string({ required_error: 'New Password is required' }),
})

export default changePasswordZodSchema
