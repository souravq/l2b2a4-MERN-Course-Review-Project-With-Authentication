import { z } from 'zod'

const reviewValidationSchema = z.object({
  rating: z.number({
    required_error: 'Rating is required',
  }),
  review: z.string({
    required_error: 'Review is required',
  }),
})

export default reviewValidationSchema
