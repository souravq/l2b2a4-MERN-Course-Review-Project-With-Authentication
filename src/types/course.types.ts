import { ObjectId } from 'mongodb'

type Tag = {
  name: string
  isDeleted: boolean
}

export type CourseResponse = {
  _id?: ObjectId
  title: string
  instructor: string
  categoryId: ObjectId
  price: number
  tags: Tag[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks: number
  details: {
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    description: string
  }
}
