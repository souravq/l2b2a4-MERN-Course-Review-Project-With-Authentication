import { NextFunction, Request, Response } from 'express'
import { ChangePasswordService } from './changePassword.service'

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
    console.log(result)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const changePasswordController = {
  changePassword,
}
