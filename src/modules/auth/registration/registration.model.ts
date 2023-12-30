/* eslint-disable @typescript-eslint/no-this-alias */
// 2. Create a Schema corresponding to the document interface.

import { Schema, model } from 'mongoose'
import { TPasswordHistory, TRegisterUser } from './registration.interface'
import bcrypt from 'bcrypt'
import AppError from '../../../error/handleAppError'
import httpStatus from 'http-status'
import { configData } from '../../../config'
import isStrongPassword from '../../../utils/strongPasswordCheck'

const passwordHistorySchema = new Schema<TPasswordHistory>({
  password: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
})

const registerUserSchema = new Schema<TRegisterUser>(
  {
    username: {
      type: 'String',
      required: [true, 'Username is required.'],
      unique: true,
    },
    email: {
      type: 'String',
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: { type: 'String', required: [true, 'Password is required.'] },
    passwordHistory: { type: [passwordHistorySchema] },
    role: {
      type: 'String',
      enum: {
        values: ['user', 'admin'],
        message: 'Invalid Role. Must be one of: user, admin',
      },
      required: [true, 'Role is required.'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

// Creating Pre Middleware for Password encryption
registerUserSchema.pre('save', async function (next) {
  const user = this
  if (isStrongPassword(user.password)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      isStrongPassword(user.password) as string,
    )
  }
  user.password = await bcrypt.hash(
    user.password,
    parseInt(configData.bcrypt_salt_rounds as string),
  )

  user.passwordHistory.push({
    password: user.password,
    timestamp: new Date(),
  })
  next()
})

// 3. Create a Model.
export const RegisterUser = model<TRegisterUser>(
  'RegisterUser',
  registerUserSchema,
)
