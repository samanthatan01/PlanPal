const { body, param } = require("express-validator");

// validateEventInput -- body (title, date, time, address, response_deadline)
const validateEventInput = [
  body("title", "title is required").not().isEmpty(),
  body(
    "title",
    "enter title that has a character length between 1 to 100"
  ).isLength({
    min: 1,
    max: 100,
  }),
  body("date", "date is required").not().isEmpty(),
  body("date", "enter date in format YYYY-MM-DD").isDate(),
  body("time", "time is required").not().isEmpty(),
  body("time", "enter time in format hh:mm").isTime(),
  body("address", "address is required").not().isEmpty(),
  body(
    "address",
    "enter an address that has a character length between 1 to 100"
  ).isLength({
    min: 1,
    max: 100,
  }),
  body("response_deadline", "response_deadline is required").not().isEmpty(),
  body(
    "response_deadline",
    "enter response_deadline in format YYYY-MM-DD"
  ).isDate(),
];

// validateIdInParam
const validateIdInParam = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 36, max: 36 }),
];

// validateIdInBody
const validateIdInBody = [
  body("id", "id is required").not().isEmpty(),
  body("id", "id is invalid").isLength({ min: 36, max: 36 }),
];

// validateDeleteEvent - body (is_active (boolean))
const validateDeleteEvent = [
  body("is_active", "is_active is required").not().isEmpty(),
  body("is_active", "is_active must be boolean").isBoolean(),
];

module.exports = {
  validateEventInput,
  validateIdInParam,
  validateIdInBody,
  validateDeleteEvent,
};
