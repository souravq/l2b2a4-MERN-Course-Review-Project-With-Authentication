/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ChangePasswordService } from './changePassword.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'
import changePasswordZodSchema from './changePassword.validation'
import { ObjectId } from 'mongoose'

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = { ...req.user }
    const password = { ...req.body }

    // Apply zod validation
    const validateData = await changePasswordZodSchema.parse(password)

    const result = await ChangePasswordService.changePassword(
      userData,
      password,
    )
    // if (result?.includes('Password change failed')){
    //   res.status(400).json({
    //     success: false,
    //     statusCode: 400,
    //     message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`,
    //     data: null,
    //   })
    // }
    // if(result?.success === false){

    // }else{
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
