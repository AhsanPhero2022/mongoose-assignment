import Joi from 'joi';

const fullNameJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const addressJoiSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

const orderJoiSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

export const userJoiSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.number().required(),
  password: Joi.string().required(),
  fullName: fullNameJoiSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required().email(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressJoiSchema.required(),
  order: Joi.array().items(orderJoiSchema),
});
export default userJoiSchema;