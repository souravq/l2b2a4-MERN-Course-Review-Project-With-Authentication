/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod'

export const handleZodError = (err: ZodError) => {
  let errorString = ''
  const errorDetails = err.issues.forEach((error) => {
    errorString += `${error.message}. `
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorString.trim(),
  }
}
