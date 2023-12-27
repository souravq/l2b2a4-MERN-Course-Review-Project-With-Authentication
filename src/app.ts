import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
import router from './routes'
import { configData } from './config'

const app: Application = express()

// Middleware
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send(`Course Review API SUITS is running on PORT ${configData.port}`)
})

// Common routes used
app.use('/api', router)

// Middleware - Error Handler
app.use(globalErrorHandler)

// Not found - Middleware
app.use(notFound)

export default app
