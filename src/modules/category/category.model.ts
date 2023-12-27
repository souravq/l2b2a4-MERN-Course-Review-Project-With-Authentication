// Create Category Schema

import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: [true, "Course Category name is required"],
    unique: true,
  },
});

export const Category = model<TCategory>("Category", CategorySchema);
