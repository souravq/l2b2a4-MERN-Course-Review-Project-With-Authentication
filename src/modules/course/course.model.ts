// 2. Create a Schema corresponding to the document interface.

import { Schema, model } from 'mongoose'
import { TCourse, TTag } from './course.interface'

const TagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  isDeleted: {
    type: Boolean,
    required: [true, 'isDeleted is required'],
  },
})

const CourseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    instructor: { type: String, required: [true, 'Instructor is required'] },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category ID is required'],
    },
    price: {
      type: Number,
      min: [0, 'Price must be greater than or equal to 0'],
    },
    tags: {
      type: [TagSchema],
      validate: {
        validator: function (v: TTag[]) {
          return v.length > 0
        },
        message: 'At least one tag is required',
      },
    },
    startDate: { type: String, required: [true, 'Start date is required'] },
    endDate: { type: String, required: [true, 'End date is required'] },
    language: { type: String, required: [true, 'Language is required'] },
    provider: { type: String, required: [true, 'Provider is required'] },
    durationInWeeks: { type: Number },
    details: {
      level: {
        type: String,
        enum: {
          values: ['Beginner', 'Intermediate', 'Advanced'],
          message:
            'Invalid level. Must be one of: Beginner, Intermediate, Advanced',
        },
        required: [true, 'Level is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
      },
    },
  },
  { timestamps: true },
)

// Update Course Schema

// const updateCourseSchema = new Schema<TCourse>({
//   title: { type: String, unique: true },
//   instructor: { type: String },
//   categoryId: {
//     type: Schema.Types.ObjectId,
//   },
//   price: { type: Number, min: [0, 'Price must be greater than or equal to 0'] },
//   tags: { type: [TagSchema] },
//   startDate: { type: String },
//   endDate: { type: String },
//   language: { type: String },
//   provider: { type: String },
//   details: {
//     level: {
//       type: String,
//       enum: {
//         values: ['Beginner', 'Intermediate', 'Advanced'],
//         message:
//           'Invalid level. Must be one of: Beginner, Intermediate, Advanced',
//       },
//     },
//     description: { type: String },
//   },
// })

// 3. Create a Model.

export const Course = model<TCourse>('Course', CourseSchema)

// Update Course Model

//export const UpdateCourseModel = model<TCourse>('Course', updateCourseSchema)
