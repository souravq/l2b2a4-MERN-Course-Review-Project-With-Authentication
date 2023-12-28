import { NextFunction, Request, Response } from 'express'
import AppError from '../error/handleAppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { configData } from '../config'

const authWrapper = (...roles: string[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization
      // Check Token is exist or not
      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, 'Anthorized user1')
      }

      // Verify The Token
      jwt.verify(
        token,
        configData.jwt_access_secret as string,
        function (err, decoded) {
          if (err) {
            throw new AppError(httpStatus.FORBIDDEN, 'Anthorized user2')
          } else {
            const role = (decoded as JwtPayload)?.role
            // Check role is Authorized
            if (roles && !roles.includes(role)) {
              throw new AppError(httpStatus.FORBIDDEN, 'Anthorized user3')
            } else {
              console.log('Authorized User')
              req.user = decoded as JwtPayload
            }
          }
        },
      )

      next()
    } catch (err) {
      next(err)
    }
  }
}

export default authWrapper
