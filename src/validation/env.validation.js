import joi from 'joi';

export const envConfigSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'test', 'production', 'local')
      .default('development'),
    APP_PORT: joi.number().required()
  })
  .unknown()
  .required();
