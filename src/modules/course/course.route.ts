import express from 'express'
import { CourseController } from './course.controller'

const router = express.Router()

const updateRouter = express.Router()

router.post('/', CourseController.createCourse)

router.get('/best', CourseController.getBestCourse)

updateRouter.get('/', CourseController.courseSearchAndFilter)

updateRouter.put('/:courseId', CourseController.updateCourse)

updateRouter.get('/:courseId/reviews', CourseController.getCourseByIdWithReview)

export const courseRouter = {
  router,
  updateRouter,
}
