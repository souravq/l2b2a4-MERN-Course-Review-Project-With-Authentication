import { NextFunction, Request, Response } from 'express'
import { ChangePasswordService } from './changePassword.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = { ...req.user }
    const password = { ...req.body }
    const result = await ChangePasswordService.changePassword(
      userData,
      password,
    )
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Password changed successfully',
      data: {
        _id: result?._id,
        username: result?.username,
        email: result?.email,
        role: result?.role,
        createdAt: result?.createdAt,
        updatedAt: result?.updatedAt,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const changePasswordController = {
  changePassword,
}
