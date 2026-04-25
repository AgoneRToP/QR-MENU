import { Schema, SchemaTypes, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      min: [3, "Name must be at least 3 characters long."],
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
      min: [8, "Name must be at least 8 characters long."],
    },
    role: {
      type: SchemaTypes.String,
      enum: ['ADMIN', 'USER', 'VIEWER'],
      default: "USER",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "users",
  },
);

export const User = model("User", UserSchema);
