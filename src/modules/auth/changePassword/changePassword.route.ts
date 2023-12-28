import express from 'express'
import { changePasswordController } from './changePassword.controller'
import authWrapper from '../../../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  authWrapper('user', 'admin'),
  changePasswordController.changePassword,
)

export const ChangePasswordRoute = router
