import { NextFunction, Request, Response } from 'express'
import AppError from '../error/handleAppError'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { configData } from '../config'

const authWrapper = (...roles: string[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(roles)
      const token = req.headers.authorization
      // Check Token is exist or not
      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, 'Anthorized user')
      }

      // Verify The Token
      jwt.verify(
        token,
        configData.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(httpStatus.FORBIDDEN, 'Anthorized user')
          } else {
            console.log(decoded)
          }
        },
      )

      next()
    } catch (err) {
      console.log('Enter 1')
      next(err)
    }
  }
}

export default authWrapper
