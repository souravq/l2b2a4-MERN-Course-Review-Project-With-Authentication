/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { LoginUserService } from './login.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import loginZodSchema from './login.validation'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Apply zod validation
    const validateData = await loginZodSchema.parse(req.body)

    const result = await LoginUserService.loginUser(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User login successful',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const LoginUserController = {
  loginUser,
}
