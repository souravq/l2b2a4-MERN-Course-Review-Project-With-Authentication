import express from 'express'
import { RegisterUserController } from './registration.controller'

const router = express.Router()

router.post('/register', RegisterUserController.registerUser)

export const RegisterRoutes = router
