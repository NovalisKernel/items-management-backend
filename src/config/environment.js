import dotenv from 'dotenv';
import joi from 'joi';

import { envConfigSchema } from '../validation/env.validation';

dotenv.config();

const dotEnvFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: dotEnvFile });

const { error: validationError, value: envVars } = joi.validate(
  process.env,
  envConfigSchema
);

console.log('ENVVARS', envVars);

if (validationError) {
  throw new Error(`Config validation error: ${validationError.message}`);
}

export default {
  app: {
    environment: envVars.NODE_ENV,
    port: envVars.APP_PORT,
    origin: envVars.CLIENT_URI
  },
  postgres: {
    uri: envVars.POSTGRES_CONNECTION_URI
  },
  auth: {
    jwtSecret: envVars.JWT_SECRET,
    jwtTimeToLive: envVars.JWT_TIME_TO_LIVE
  }
};
