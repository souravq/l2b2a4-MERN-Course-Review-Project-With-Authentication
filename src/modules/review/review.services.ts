// Create Review

import httpStatus from 'http-status'
import AppError from '../../error/handleAppError'
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

    if (!(reviewData.rating >= 1 && reviewData.rating <= 5)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Rating, should be falls within the range of 1 to 5',
      )
    }
    const result = await (await Review.create(reviewData)).populate('createdBy')
    return result
  } catch (err) {
    throw err
  }
}

export const reviewService = {
  createReviewIntoDB,
}
