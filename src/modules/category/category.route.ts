import express from 'express'
import { CategoryController } from './category.controller'
//import auth from '../../middlewares/auth'
import authWrapper from '../../middlewares/auth'
const router = express.Router()

router.post('/', CategoryController.createCategory)
router.get('/', authWrapper('user', 'admin'), CategoryController.getAllCategory)

export const categoryRouter = {
  router,
}
