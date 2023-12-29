/* eslint-disable @typescript-eslint/no-unused-vars */
// Register User

import { NextFunction, Request, Response } from 'express'
import { RegisterUserService } from './registration.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import registerUserZodSchema from './registration.validation'

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Apply zod validation

    const validateData = await registerUserZodSchema.parse(req.body)

    const result = await RegisterUserService.registerUserIntoDB(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully',
      data: {
        _id: result._id,
        username: result.username,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const RegisterUserController = {
  registerUser,
}
