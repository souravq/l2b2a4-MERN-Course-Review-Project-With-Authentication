import express from 'express'
import { CourseController } from './course.controller'
import authWrapper from '../../middlewares/auth'

const router = express.Router()

const updateRouter = express.Router()

updateRouter.post('/', authWrapper('admin'), CourseController.createCourse)

router.get('/best', CourseController.getBestCourse)

updateRouter.get('/', CourseController.courseSearchAndFilter)

updateRouter.put(
  '/:courseId',
  authWrapper('admin'),
  CourseController.updateCourse,
)

updateRouter.get('/:courseId/reviews', CourseController.getCourseByIdWithReview)

export const courseRouter = {
  router,
  updateRouter,
}
