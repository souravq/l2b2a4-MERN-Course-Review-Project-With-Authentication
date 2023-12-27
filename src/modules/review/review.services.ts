// Create Review

import { Course } from '../course/course.model'
import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDB = async (reviewData: TReview) => {
  const { courseId } = reviewData
  // eslint-disable-next-line no-useless-catch
  try {
    if (!courseId) {
      throw new Error('Please give courseId')
    }
    const existingCourse = await Course.findById(courseId)
    if (!existingCourse) {
      throw new Error('Course not found')
    }
    const result = await Review.create(reviewData)
    return result
  } catch (err) {
    throw err
  }
}

export const reviewService = {
  createReviewIntoDB,
}
