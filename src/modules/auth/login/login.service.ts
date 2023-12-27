import httpStatus from 'http-status'
import { RegisterUser } from '../registration/registration.model'
import { TLoginUser } from './login.interface'
import bcrypt from 'bcrypt'
import AppError from '../../../error/handleAppError'
import jwt from 'jsonwebtoken'

const loginUser = async (loginUserData: TLoginUser) => {
  console.log(loginUserData)

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

  const accessToken = jwt.sign(jsonPayload, '123456', { expiresIn: '1h' })

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
