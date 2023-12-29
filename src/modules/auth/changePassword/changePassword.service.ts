import { JwtPayload } from 'jsonwebtoken'
import { RegisterUser } from '../registration/registration.model'
import AppError from '../../../error/handleAppError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { configData } from '../../../config'

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
    throw new AppError(httpStatus.NOT_FOUND, 'Current Password is not correct')
  }

  // Check Last 3 Password
  if (payload.currentPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Password change failed. Ensure the new password is unique and not among the last 2 used',
    )
  }
  //   const isSameAsPasswordHistory = user.passwordHistory.some((dbPassword) => {
  //     bcrypt.compare(payload.newPassword, dbPassword)
  //   })
  //   console.log(isSameAsPasswordHistory, 'hello')

  //   if (isSameAsPasswordHistory) {
  //     throw new AppError(
  //       httpStatus.NOT_FOUND,
  //       'Password change failed. Ensure the new password is unique and not among the last 2 used used',
  //     )
  //   }

  const isSameAsPasswordHistory = await Promise.all(
    user.passwordHistory.map(async (dbPassword) => {
      return bcrypt.compare(payload.newPassword, dbPassword)
    }),
  )

  if (isSameAsPasswordHistory.some((result) => result)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Password change failed. Ensure the new password is unique and not among the last 2 used used',
    )
  }

  const newPasswordHistory = [...user.passwordHistory]
  newPasswordHistory.push(user.password)

  // Check History Password limit
  if (newPasswordHistory.length > 2) {
    newPasswordHistory.shift()
  }

  // Hashed new Password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    parseInt(configData.bcrypt_salt_rounds as string),
  )

  const result = await RegisterUser.findOneAndUpdate(
    { _id: _id, role: role, email: email },
    { password: newHashedPassword, passwordHistory: newPasswordHistory },
    { new: true },
  )
  return result
}

export const ChangePasswordService = {
  changePassword,
}
