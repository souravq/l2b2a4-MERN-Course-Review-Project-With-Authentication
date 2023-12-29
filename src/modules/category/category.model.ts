// Create Category Schema

import { Schema, model } from 'mongoose'
import { TCategory } from './category.interface'
import { RegisterUser } from '../auth/registration/registration.model'

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'Course Category name is required'],
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: RegisterUser,
    },
  },

  {
    timestamps: true,
  },
)

export const Category = model<TCategory>('Category', CategorySchema)
