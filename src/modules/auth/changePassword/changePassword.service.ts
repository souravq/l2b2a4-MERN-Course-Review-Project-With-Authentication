import { JwtPayload } from 'jsonwebtoken'
import { RegisterUser } from '../registration/registration.model'

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  console.log(userData)
  console.log(payload)
  const { _id } = userData
  const isExist = await RegisterUser.findOneAndUpdate(
    { _id: _id },
    { password: payload.newPassword },
    { new: true },
  )
  console.log(isExist)
  return null
}

export const ChangePasswordService = {
  changePassword,
}
