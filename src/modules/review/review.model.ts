import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const ReviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course ID is required'],
    ref: 'Course',
  },
  rating: { type: Number, required: [true, 'Rating is required'] },
  review: { type: String, required: [true, 'Review is required'] },
})

export const Review = model<TReview>('Review', ReviewSchema)
