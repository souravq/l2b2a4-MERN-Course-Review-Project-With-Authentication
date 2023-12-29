import express from 'express'
import { reviewController } from './review.controller'
import authWrapper from '../../middlewares/auth'
const router = express.Router()

router.post('/', authWrapper('user'), reviewController.createReview)

export const reviewRouter = {
  router,
}
