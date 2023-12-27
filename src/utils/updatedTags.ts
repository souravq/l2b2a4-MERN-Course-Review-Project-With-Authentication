import { TTag } from '../modules/course/course.interface'

export const updatedTags = (tags: TTag[]) => {
  const newTags = tags.map((data: TTag) => {
    return {
      name: data.name,
      isDeleted: data.isDeleted,
    }
  })
  return newTags
}
