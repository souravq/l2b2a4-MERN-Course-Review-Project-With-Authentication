import express from 'express'
import { CategoryController } from './category.controller'
import authWrapper from '../../middlewares/auth'
const router = express.Router()

router.post('/', authWrapper('admin'), CategoryController.createCategory)
router.get('/', CategoryController.getAllCategory)

export const categoryRouter = {
  router,
}
