// 1. Course Model:
// Fields:
// _id (Object ID): A distinctive identifier generated by MongoDB.
// title (String): A unique title of the course.
// instructor (String): The instructor of the course.
// categoryId (Object ID): A reference to the category collection.
// price (Number): The price of the course.
// tags(Array of Object): The "tags" field is an array of objects, each having a "name" (string) and "isDeleted" (boolean) property.
// startDate (String): The start date of the course.
// endDate (String): The end date of the course.
// language (String): The language in which the course is conducted.
// provider (String): The provider of the course.
// durationInWeeks (Integer): This represents the course's overall duration in weeks, calculated by applying the ceil function to the numeric value derived from the start and end dates. The resulting number is rounded up to the nearest integer, ensuring that the duration is expressed solely as an integer with no allowance for floating-point numbers.
// details (Object):
// level (string): e.g., Beginner, Intermediate, Advanced.
// description (string): Detailed description of the course

// 1. Create an interface representing a document in MongoDB.

import { ObjectId } from 'mongodb'

// Tag Interface
export type TTag = {
  name: string
  isDeleted: boolean
}

//Course Interface
export type TCourse = {
  title: string
  instructor: string
  categoryId: ObjectId
  price: number
  tags: TTag[]
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
