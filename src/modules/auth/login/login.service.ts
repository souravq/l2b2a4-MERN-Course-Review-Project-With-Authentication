import httpStatus from 'http-status'
import { RegisterUser } from '../registration/registration.model'
import { TLoginUser } from './login.interface'
import bcrypt from 'bcrypt'
import AppError from '../../../error/handleAppError'
import jwt from 'jsonwebtoken'
import { configData } from '../../../config'

const loginUser = async (loginUserData: TLoginUser) => {
  //Check the user exist or not
  const user = await RegisterUser.findOne({
    username: loginUserData?.username,
  })

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not exist.')
  }

  // Check Password
  const isPasswordCorrect = await bcrypt.compare(
    loginUserData?.password,
    user?.password,
  )

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password is not correct')
  }

  // Creating Data Payload
  const jsonPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  }

  // Generate Access Token
  const accessToken = jwt.sign(
    jsonPayload,
    configData.jwt_access_secret as string,
    { expiresIn: '1h' },
  )

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token: accessToken,
  }
}

export const LoginUserService = {
  loginUser,
}
