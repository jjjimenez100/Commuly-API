const { body, validationResult } = require('express-validator');

const existsOptions = {
  checkNull: true,
  checkFalsy: true,
};

const requiredString = (parameterName) => body(parameterName)
  .exists(existsOptions)
  .bail()
  .isString()
  .bail();

const requiredBoolean = (parameterName) => body(parameterName)
  .exists(existsOptions)
  .bail()
  .isBoolean()
  .bail();

const requiredDecimal = (parameterName) => body(parameterName)
  .exists(existsOptions)
  .bail()
  .isDecimal()
  .bail();

const requiredInteger = (parameterName) => body(parameterName)
  .exists(existsOptions)
  .bail()
  .isInt()
  .bail();

const requiredNumeric = (parameterName) => body(parameterName)
  .exists(existsOptions)
  .bail()
  .isNumeric()
  .bail();

const validatePolicies = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().forEach((error) => {
    extractedErrors.push({
      [error.param]: error.msg,
    });
  });

  return response.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  requiredBoolean,
  requiredDecimal,
  requiredInteger,
  requiredNumeric,
  requiredString,
  validatePolicies,
};
