/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { handleZodError } from '../error/handleZodError'
import { handleValidationError } from '../error/handleValidationError'
import { handleCastError } from '../error/handleCastError'
import { handleDuplicateError } from '../error/handleDuplicateError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting Default values
  let statusCode = err.statusCode || 500
  const success = false
  let message = err.message || 'Something went wrong!!!'
  let errorMessage = err.message || 'Something went wrong!!!'

  if (err instanceof ZodError) {
    const zodErrorDetails = handleZodError(err)
    statusCode = zodErrorDetails?.statusCode
    message = zodErrorDetails?.message
    errorMessage = zodErrorDetails?.errorMessage
  } else if (err?.name === 'ValidationError') {
    const validationErrorDetails = handleValidationError(err)
    statusCode = validationErrorDetails?.statusCode
    message = validationErrorDetails?.message
    errorMessage = validationErrorDetails?.errorMessage
  } else if (err?.name === 'CastError') {
    const validationErrorDetails = handleCastError(err)
    statusCode = validationErrorDetails?.statusCode
    message = validationErrorDetails?.message
    errorMessage = validationErrorDetails?.errorMessage
  } else if (err?.code === 11000) {
    const validationErrorDetails = handleDuplicateError(err)
    statusCode = validationErrorDetails?.statusCode
    message = validationErrorDetails?.message
    errorMessage = validationErrorDetails?.errorMessage
  }

  return res.status(statusCode).json({
    success,
    message,
    errorMessage,
    errorDetails: err,
    stack: err.stack,
  })
}

export default globalErrorHandler
