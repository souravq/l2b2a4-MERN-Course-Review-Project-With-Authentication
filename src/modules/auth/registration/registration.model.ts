/* eslint-disable @typescript-eslint/no-this-alias */
// 2. Create a Schema corresponding to the document interface.

import { Schema, model } from 'mongoose'
import { TRegisterUser } from './registration.interface'
import bcrypt from 'bcrypt'

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
  user.password = await bcrypt.hash(user.password, 12)
  next()
})

// 3. Create a Model.
export const RegisterUser = model<TRegisterUser>(
  'RegisterUser',
  registerUserSchema,
)
