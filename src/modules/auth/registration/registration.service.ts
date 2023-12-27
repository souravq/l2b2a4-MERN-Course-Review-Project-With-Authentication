import { TRegisterUser } from './registration.interface'
import { RegisterUser } from './registration.model'

const registerUserIntoDB = async (registerUserData: TRegisterUser) => {
  try {
    const result = await RegisterUser.create(registerUserData)
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const RegisterUserService = {
  registerUserIntoDB,
}
