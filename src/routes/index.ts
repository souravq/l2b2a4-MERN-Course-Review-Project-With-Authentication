import express from 'express'
import { courseRouter } from '../modules/course/course.route'
import { categoryRouter } from '../modules/category/category.route'
import { reviewRouter } from '../modules/review/review.route'
import { RegisterRoutes } from '../modules/auth/registration/registration.route'
import { LoginRouter } from '../modules/auth/login/login.route'
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
    path: '/auth/login',
    route: LoginRouter,
  },
  {
    path: '/auth/register',
    route: RegisterRoutes,
  },
]

routeObj.forEach((routeData) => router.use(routeData.path, routeData.route))

export default router
