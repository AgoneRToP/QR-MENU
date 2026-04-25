import { Schema, SchemaTypes, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      min: [3, "The product name must be at least three characters long."],
    },
    price: {
      type: SchemaTypes.Decimal128,
      required: true,
    },
    category_id: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Category",
    },
    image: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "products",
  },
);

export const Product = model("Product", ProductSchema);
