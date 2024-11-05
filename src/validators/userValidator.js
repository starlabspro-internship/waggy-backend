// validators/userValidator.js
const Joi = require("joi");

// Define the Joi schema for user registration validation
const registrationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
      "string.empty": "Email is required.",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password should have a minimum length of {#limit}.",
      "string.empty": "Password is required.",
    }),
  firstName: Joi.string().when("organisationName", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  lastName: Joi.string().when("organisationName", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  organisationName: Joi.string().optional(),
});

module.exports = {
  registrationSchema,
};
