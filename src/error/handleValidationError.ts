/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  let errorString = ''
  const errorDetails = Object.values(err.errors).forEach((error) => {
    errorString += `${error.message}. `
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorString.trim(),
  }
}
