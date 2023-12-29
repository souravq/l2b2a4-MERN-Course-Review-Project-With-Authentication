/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { CategoryService } from './category.service'
import { TCategory } from './category.interface'
import categoryValidationSchema from './category.validation'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// Create Category
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get Category data
    const categoryData: TCategory = req.body
    // Apply Zod Validation
    const validateCategoryData =
      await categoryValidationSchema.parse(categoryData)

    // Add Admin UserId in courseData
    categoryData['createdBy'] = req.user._id

    const result = await CategoryService.createCategoryIntoDB(categoryData)
    if (result) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Category created successfully',
        data: {
          _id: result._id,
          name: result.name,
          createdBy: result.createdBy,
          createdAt: result?.createdAt,
          updatedAt: result?.updatedAt,
        },
      })
    }
  } catch (err) {
    next(err)
  }
}

// Get All category

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.getAllCategory()
    if (result) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Categories retrieved successfully',
        data: {
          categories: result.map((data) => {
            return {
              _id: data._id,
              name: data.name,
              createdBy: {
                _id: data.createdBy._id,
                username: data.createdBy.username,
                email: data.createdBy.email,
                role: data.createdBy.role,
              },
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
            }
          }),
        },
      })
    }
  } catch (err) {
    next(err)
  }
}

export const CategoryController = {
  createCategory,
  getAllCategory,
}
