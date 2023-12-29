import { TRegisterUser } from './registration.interface'
import { RegisterUser } from './registration.model'

const registerUserIntoDB = async (registerUserData: TRegisterUser) => {
  const result = await RegisterUser.create(registerUserData)
  console.log(registerUserData)
  return result
  //return 0
}

export const RegisterUserService = {
  registerUserIntoDB,
}
