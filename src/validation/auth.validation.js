const Joi = require('joi');

const registrationSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  username: Joi.string()
});

export { registrationSchema };
