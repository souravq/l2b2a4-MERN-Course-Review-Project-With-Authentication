import { JwtPayload } from 'jsonwebtoken'
import { RegisterUser } from '../registration/registration.model'
import AppError from '../../../error/handleAppError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { configData } from '../../../config'
import isStrongPassword from '../../../utils/strongPasswordCheck'

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

  if (isStrongPassword(payload?.newPassword)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      isStrongPassword(payload?.newPassword) as string,
    )
  }

  // Check Last 3 Password
  // if (payload.currentPassword === payload.newPassword) {
  //   throw new AppError(
  //     httpStatus.NOT_FOUND,
  //     'Password change failed. Ensure the new password is unique and not among the last 2 used',
  //   )
  // }
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
      return bcrypt.compare(payload.newPassword, dbPassword.password)
    }),
  )

  let index1 = 0
  if (
    isSameAsPasswordHistory.some((result, index) => {
      index1 = index
      return result
    })
  ) {
    type DateFormatOptions = {
      year: 'numeric'
      month: '2-digit'
      day: '2-digit'
      hour: '2-digit'
      minute: '2-digit'
      hour12: boolean
    }
    const options: DateFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }

    const formattedDate = user.passwordHistory[
      index1
    ].timestamp.toLocaleDateString('en-US', options)
    const dateTimeArr = formattedDate.split(',')
    const dateArr = dateTimeArr[0].split('/')
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`,
    )

    // const passwordChangeFailedResponse = `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`
    // return passwordChangeFailedResponse
  }

  // Hashed new Password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    parseInt(configData.bcrypt_salt_rounds as string),
  )

  const newPasswordHistory = user.passwordHistory
  newPasswordHistory.push({
    password: newHashedPassword,
    timestamp: new Date(),
  })

  // Check History Password limit
  if (newPasswordHistory.length > 3) {
    newPasswordHistory.shift()
  }

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
