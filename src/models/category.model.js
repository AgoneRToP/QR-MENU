import { Schema, SchemaTypes, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      min: [3, "The category name must be at least 3 characters long."],
      trim: true,
      unique: true,
    },
    user_id: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "categories",
  },
);

export const Category = model("Category", CategorySchema);
