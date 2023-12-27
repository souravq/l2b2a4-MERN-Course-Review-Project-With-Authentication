import express from 'express'
import { LoginUserController } from './login.controller'

const router = express.Router()

router.post('/login', LoginUserController.loginUser)

export const LoginRouter = router
