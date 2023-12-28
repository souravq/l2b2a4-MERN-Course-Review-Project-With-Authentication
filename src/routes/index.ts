import express from 'express'
import { courseRouter } from '../modules/course/course.route'
import { categoryRouter } from '../modules/category/category.route'
import { reviewRouter } from '../modules/review/review.route'
import { RegisterRoutes } from '../modules/auth/registration/registration.route'
import { LoginRouter } from '../modules/auth/login/login.route'
import { ChangePasswordRoute } from '../modules/auth/changePassword/changePassword.route'
const router = express.Router()

const routeObj = [
  {
    path: '/course',
    route: courseRouter.router,
  },
  {
    path: '/courses',
    route: courseRouter.updateRouter,
  },
  {
    path: '/categories',
    route: categoryRouter.router,
  },
  {
    path: '/reviews',
    route: reviewRouter.router,
  },
  {
    path: '/auth/register',
    route: RegisterRoutes,
  },
  {
    path: '/auth/login',
    route: LoginRouter,
  },
  {
    path: '/auth/change-password',
    route: ChangePasswordRoute,
  },
]

routeObj.forEach((routeData) => router.use(routeData.path, routeData.route))

export default router
