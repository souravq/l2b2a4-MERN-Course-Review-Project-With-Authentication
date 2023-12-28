import { JwtPayload } from 'jsonwebtoken'
import { RegisterUser } from '../registration/registration.model'
import AppError from '../../../error/handleAppError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const { _id, role, email } = userData

  // Check the User is exist or not
  const user = await RegisterUser.findOne({ _id: _id })
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not exist.')
  }

  // Check Password
  const isPasswordCorrect = await bcrypt.compare(
    payload?.currentPassword,
    user?.password,
  )

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password is not correct')
  }

  // Hashed new Password
  const newHashedPassword = await bcrypt.hash(payload?.newPassword, 12)

  const result = await RegisterUser.findOneAndUpdate(
    { _id: _id, role: role, email: email },
    { password: newHashedPassword },
    { new: true },
  )
  return result
}

export const ChangePasswordService = {
  changePassword,
}
