import { Schema, SchemaTypes, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    message: {
      type: SchemaTypes.String,
      required: true,
      max: [10000, "The message must be no more than 10000 characters."],
    },
    type: {
      type: SchemaTypes.String,
      enum: ["REVIEW", "COMPLAINT"],
      default: "REVIEW",
    },
    image: {
      type: SchemaTypes.String,
      default: null,
    },
    user_id: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: SchemaTypes.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "feedbacks",
  },
);

export const Feedback = model("Feedback", FeedbackSchema);
