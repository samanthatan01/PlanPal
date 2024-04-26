const { body, param } = require("express-validator");

// validateIdInParams
const validateIdInParam = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 36, max: 36 }),
];

// validateResponseInput - body(diet, is_attending)
const validateResponseInput = [
  body("is_attending", "is_attending is required").not().isEmpty(),
  body("is_attending", "is_attending must be boolean").isBoolean(),
  body("diet", "dietary preference is required").not().isEmpty(),
];

module.exports = { validateIdInParam, validateResponseInput };
