import Joi from "joi";

export const LoginSchema = Joi.object({
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string().email().required(),
});
