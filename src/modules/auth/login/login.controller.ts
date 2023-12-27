/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { LoginUserService } from './login.service'

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await LoginUserService.loginUser(req.body)
    console.log(result)
  } catch (err) {
    next(err)
  }
}

export const LoginUserController = {
  loginUser,
}
