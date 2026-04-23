import { Schema, SchemaTypes, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      min: [3, "The category name must be at least 3 characters long."],
    },
    category_id: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    colletion: "categories",
  },
);

export const Category = model("CategorY", CategorySchema);
