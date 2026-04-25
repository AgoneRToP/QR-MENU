import Joi from "joi";

export const RegisterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});
