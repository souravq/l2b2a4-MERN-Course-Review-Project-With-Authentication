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
    const result =
      await CategoryService.createCategoryIntoDB(validateCategoryData)
    if (result) {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Category created successfully',
        data: {
          _id: result._id,
          name: result.name,
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
        data: result.map((data) => {
          return {
            _id: data._id,
            name: data.name,
          }
        }),
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
