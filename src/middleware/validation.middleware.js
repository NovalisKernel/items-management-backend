import joi from 'joi';
import httpStatus from 'http-status';

const validation = (schema, property = 'body') => (req, res, next) => {
  const { error } = joi.validate(req[property], schema);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    res.status(httpStatus.BAD_REQUEST).json({
      message: message
    });
  }
};

export default validation;
