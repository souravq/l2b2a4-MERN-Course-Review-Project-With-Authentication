/* eslint-disable no-useless-catch */
import { ObjectId } from 'mongodb'
import { TCourse, TTag } from './course.interface'
import { Course } from './course.model'
import { Review } from '../review/review.model'
import { updatedTags } from '../../utils/updatedTags'
import { CourseResponse } from '../../types/course.types'
import calculateDurationInWeeks from '../../utils/durationInWeeks'
import { Category } from '../category/category.model'

// Create Course
const createCourseIntoDB = async (courseData: TCourse) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Check Category Id exist or not
    const existingCategory = await Category.findById(courseData.categoryId)
    if (!existingCategory) {
      throw new Error('Category not found')
    }
    const newCourse = await Course.create(courseData)
    return newCourse
  } catch (err) {
    throw err
  }
}

// Course Search and Filter
const courseSearchAndFilter = async (queryData: Record<string, unknown>) => {
  try {
    // Copy the query data
    const queryObject = { ...queryData }

    /* Which fields have to exclude */
    const excludeFields = [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'minPrice',
      'maxPrice',
      'startDate',
      'endDate',
      'level',
      'durationInWeeks',
      'tags',
    ]
    excludeFields.forEach((data) => delete queryObject[data])

    // If language available
    if (typeof queryObject.language === 'string') {
      queryObject.language = new RegExp(queryObject.language, 'i')
    }

    //If provider available
    if (typeof queryObject.provider === 'string') {
      queryObject.provider = new RegExp(queryObject.provider, 'i')
    }

    // Build query
    let query = Course.find({ ...queryObject })

    // If level available
    if (typeof queryData.level === 'string') {
      query = query.find({
        'details.level': new RegExp(queryData.level, 'i'),
      })
    }

    // If durationInWeeks available
    if (queryData.durationInWeeks) {
      query = query.find({ durationInWeeks: queryData.durationInWeeks })
    }

    // If Start Date and End date are available
    if (queryData.startDate && queryData.endDate) {
      query = query.find({
        $and: [
          { startDate: { $gte: queryData.startDate } },
          { endDate: { $lte: queryData.endDate } },
        ],
      })
    }

    // If minPrice and MaxPrice are Available
    if (queryData.minPrice && queryData.maxPrice) {
      query = query.find({
        price: { $gte: queryData.minPrice, $lte: queryData.maxPrice },
      })
    }

    // If tag available
    if (queryData.tags) {
      query = query.find({
        tags: {
          $elemMatch: { name: queryData.tags },
        },
      })
    }

    // Sorting
    if (typeof queryData.sortBy === 'string') {
      const sortByValue = queryData.sortBy
      const allowSortFields = [
        'title',
        'price',
        'startDate',
        'endDate',
        'language',
        'durationInWeeks',
      ]
      if (allowSortFields.includes(sortByValue)) {
        if (queryData.sortOrder) {
          if (queryData.sortOrder === 'asc') {
            query = query.sort(sortByValue)
          } else if (queryData.sortOrder === 'desc') {
            query = query.sort(`-${sortByValue}`)
          }
        } else {
          query = query.sort(sortByValue)
        }
      }
    } else {
      query = query.sort({ createdAt: -1 })
    }

    // Pagination
    let page = 1
    let limit = 10

    if (typeof queryData.page === 'string') {
      page = parseInt(queryData.page) || 1
    }
    if (typeof queryData.limit === 'string') {
      limit = parseInt(queryData.limit) || 10
    }

    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    const result = await query.exec()

    const total = result.length

    const metaData = {
      page,
      limit,
      total,
    }

    return {
      result,
      metaData,
    }
  } catch (err) {
    throw err
  }
}

// Update Course
const updateCourseIntoDB = async (courseId: string, courseData: TCourse) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Check Course Id exist or not
    const existingCourse = await Course.findById(courseId)
    if (!existingCourse) {
      throw new Error('Course not found')
    }

    const { tags, details, ...remainingField } = courseData

    const modifiedData: Record<string, unknown> = { ...remainingField }

    // Calculate Duration In Week
    let week = 0
    if (
      typeof modifiedData.startDate === 'string' &&
      typeof modifiedData.endDate === 'string'
    ) {
      week = calculateDurationInWeeks(
        modifiedData.startDate,
        modifiedData.endDate,
      )
      modifiedData['durationInWeeks'] = week
    }

    // Check if durationInWeeks data without start date and end date
    if (
      modifiedData?.durationInWeeks &&
      !(
        typeof modifiedData?.startDate === 'string' &&
        typeof modifiedData?.endDate === 'string'
      )
    ) {
      throw new Error(
        "DurationInWeeks can't be update without start date and end date",
      )
    }

    // Start date and End date both checked
    if (typeof modifiedData?.startDate === 'string') {
      if (!(typeof modifiedData?.endDate === 'string'))
        throw new Error("Start date can't be update without end date")
    }

    if (typeof modifiedData?.endDate === 'string') {
      if (!(typeof modifiedData?.startDate === 'string'))
        throw new Error("End date can't be update without start date")
    }

    // Check Category Id exist or not
    if (modifiedData.categoryId) {
      const existingCategory = await Category.findById(modifiedData.categoryId)
      if (!existingCategory) {
        throw new Error('Category not found')
      }
    }

    if (details && Object.keys(details).length > 0) {
      for (const [keys, value] of Object.entries(details)) {
        modifiedData[`details.${keys}`] = value
      }
    }

    let result = await Course.findOneAndUpdate(
      { _id: new ObjectId(courseId) },
      { $set: modifiedData },
      { new: true, runValidators: true },
    )

    // For Course Tags
    if (tags) {
      let backupTags = [...tags]
      const existingTags = result?.tags

      // Update existing tags
      tags.forEach(async (data1) => {
        existingTags?.forEach(async (data2) => {
          if (data1.name == data2.name) {
            await Course.findOneAndUpdate(
              { _id: new ObjectId(courseId), 'tags.name': data1.name },
              { $set: { 'tags.$.isDeleted': data1.isDeleted } },
              {
                new: true,
              },
            )
          }
        })
      })

      // Filter existing tags
      tags.forEach(async (data1) => {
        existingTags?.forEach(async (data2) => {
          if (data1.name == data2.name) {
            backupTags = backupTags.filter((data3) => data3.name !== data1.name)
          }
        })
      })

      // Add new tags
      result = await Course.findOneAndUpdate(
        { _id: new ObjectId(courseId) },
        {
          $push: { tags: backupTags },
        },
        {
          new: true,
        },
      )
    }

    // Get expected tags
    const newTags =
      result &&
      result.tags.map((data) => {
        if (data.isDeleted === false) {
          return {
            name: data.name,
            isDeleted: data.isDeleted,
          }
        }
      })

    const filteredTags = newTags?.filter(function (el) {
      return el != null
    })

    // Updated Expected Response
    const expectedResult: CourseResponse = {
      title: result?.title as string,
      instructor: result?.instructor as string,
      categoryId: result?.categoryId as ObjectId,
      price: result?.price as number,
      tags: filteredTags as TTag[],
      startDate: result?.startDate as string,
      endDate: result?.endDate as string,
      language: result?.language as string,
      provider: result?.provider as string,
      durationInWeeks: result?.durationInWeeks as number,
      details: result?.details as {
        level: 'Beginner' | 'Intermediate' | 'Advanced'
        description: string
      },
    }

    return expectedResult
  } catch (err) {
    throw err
  }
}

//Get Course by ID with Reviews

const getCourseByIdWithReview = async (courseId: string) => {
  try {
    // Get Course Data
    const courseData = await Course.findById({
      _id: new ObjectId(courseId),
    })

    if (!courseData) {
      throw new Error('Course not found')
    }

    // Get Review Data
    const reviewResult = await Review.find({ courseId })

    const exactReviewResult =
      reviewResult &&
      reviewResult.map((result) => {
        return {
          courseId: result.courseId,
          rating: result.rating,
          review: result.review,
        }
      })

    // Merge two result
    const result = {
      course: {
        _id: courseData?._id,
        title: courseData?.title,
        instructor: courseData?.instructor,
        categoryId: courseData?.categoryId,
        price: courseData?.price,
        tags: courseData && updatedTags(courseData?.tags),
        startDate: courseData?.startDate,
        endDate: courseData?.endDate,
        language: courseData?.language,
        provider: courseData?.provider,
        details: courseData?.details,
      },
      reviews: exactReviewResult,
    }
    return result
  } catch (err) {
    throw err
  }
}

// Get the Best Course

const getBestCourse = async () => {
  try {
    const bestCourseResult = await Review.aggregate([
      {
        $group: {
          _id: '$courseId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          averageRating: -1,
        },
      },
      {
        $limit: 1,
      },
    ])

    if (!bestCourseResult) {
      throw new Error('Rating not found')
    }

    // Getting Course Id
    const courseId = bestCourseResult[0]._id

    // Fetch Course Data
    const courseData = await Course.findById({ _id: courseId })

    //Expected Result
    const result = {
      course: {
        _id: courseData?._id,
        title: courseData?.title,
        instructor: courseData?.instructor,
        categoryId: courseData?.categoryId,
        price: courseData?.price,
        tags: courseData && updatedTags(courseData?.tags),
        startDate: courseData?.startDate,
        endDate: courseData?.endDate,
        language: courseData?.language,
        provider: courseData?.provider,
        details: courseData?.details,
      },
      averageRating: bestCourseResult[0].averageRating,
      reviewCount: bestCourseResult[0].reviewCount,
    }
    return result
  } catch (err) {
    throw err
  }
}

export const CourseService = {
  createCourseIntoDB,
  courseSearchAndFilter,
  updateCourseIntoDB,
  getCourseByIdWithReview,
  getBestCourse,
}
