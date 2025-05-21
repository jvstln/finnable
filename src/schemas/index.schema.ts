import Joi from "joi";

export const recursiveObjectSchema = Joi.object().pattern(Joi.string(), [
  Joi.string(),
  Joi.object().pattern(Joi.string(), Joi.string()),
  Joi.array().items(
    Joi.string(),
    Joi.object().pattern(Joi.string(), Joi.string())
  ),
]);
