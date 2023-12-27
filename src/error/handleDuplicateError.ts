/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'

export const handleDuplicateError = (err: any) => {
  //const errorString = `${err.value} is not a valid ID!`
  const errorMessage = err.message
  const regex = /\"(.*?)\"/g
  const matches = [...errorMessage.matchAll(regex)]

  const extractedValues = matches.map((match) => match[1])

  const statusCode = 400
  return {
    statusCode,
    message: 'Duplicate Entry Error',
    errorMessage: `${extractedValues} is already exists`,
  }
}
