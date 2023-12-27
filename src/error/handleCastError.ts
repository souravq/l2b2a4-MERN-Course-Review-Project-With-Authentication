/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errorString = `${err.value} is not a valid ID!`

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: errorString.trim(),
  }
}
