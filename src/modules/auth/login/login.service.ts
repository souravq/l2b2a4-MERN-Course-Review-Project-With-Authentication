import httpStatus from 'http-status'
import { RegisterUser } from '../registration/registration.model'
import { TLoginUser } from './login.interface'
import bcrypt from 'bcrypt'
import AppError from '../../../error/handleAppError'

const loginUser = async (loginUserData: TLoginUser) => {
  console.log(loginUserData)

  //Check the user exist or not

  const isExist = await RegisterUser.findOne({
    username: loginUserData?.username,
  })

  if (!isExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not exist.')
  }

  // Check Password
  const isPasswordCorrect = await bcrypt.compare(
    loginUserData?.password,
    isExist?.password,
  )

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password is not correct')
  }

  return true
}

export const LoginUserService = {
  loginUser,
}
