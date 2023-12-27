import { TCategory } from './category.interface'
import { Category } from './category.model'

// Create Category
const createCategoryIntoDB = async (categoryData: TCategory) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await Category.create(categoryData)
    return result
  } catch (err) {
    throw err
  }
}

// Get All Category
const getAllCategory = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await Category.find({})
    return result
  } catch (err) {
    throw err
  }
}

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategory,
}
