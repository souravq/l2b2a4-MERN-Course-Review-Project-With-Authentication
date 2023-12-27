/* eslint-disable @typescript-eslint/no-unused-vars */
// Register User

import { NextFunction, Request, Response } from 'express'
import { RegisterUserService } from './registration.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await RegisterUserService.registerUserIntoDB(req.body)
    console.log(result)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const RegisterUserController = {
  registerUser,
}
