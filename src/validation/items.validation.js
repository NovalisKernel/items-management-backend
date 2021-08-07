const Joi = require('joi');

const addItemValidationSchema = Joi.object().keys({
  name: Joi.string().max(255),
  location: Joi.string().max(255),
  description: Joi.string().max(255),
  imageUrl: Joi.string().max(255)
});

export { addItemValidationSchema };
