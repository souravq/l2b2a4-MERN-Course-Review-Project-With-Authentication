import { TRegisterUser } from './registration.interface'
import { RegisterUser } from './registration.model'

const registerUserIntoDB = async (registerUserData: TRegisterUser) => {
  const result = await RegisterUser.create(registerUserData)
  return result
}

export const RegisterUserService = {
  registerUserIntoDB,
}
