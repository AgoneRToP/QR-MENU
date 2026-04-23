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
      required: true,
    },
    device_info: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Category",
    },
    created_at: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    colletion: "feedbacks",
  },
);

export const Feedback = model("Feedback", FeedbackSchema);
