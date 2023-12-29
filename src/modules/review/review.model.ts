import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'
import { RegisterUser } from '../auth/registration/registration.model'

const ReviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Course ID is required'],
      ref: 'Course',
    },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: { type: String, required: [true, 'Review is required'] },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: RegisterUser,
    },
  },
  {
    timestamps: true,
  },
)

export const Review = model<TReview>('Review', ReviewSchema)
