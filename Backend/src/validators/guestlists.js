const { body, param } = require("express-validator");

// validateIdInParams
const validateIdInParam = [
  param("id", "id is required").not().isEmpty(),
  param("id", "id is invalid").isLength({ min: 36, max: 36 }),
];

// validateIdinBody
const validateIdInBody = [
  body("id", "id is required").not().isEmpty(),
  body("id", "id is invalid").isLength({ min: 36, max: 36 }),
];

// validateAttendanceUpdate - body (guest_id, is_attending)
const validateAttendanceUpdate = [
  body("guest_id", "guest_id is required").not().isEmpty(),
  body("is_attending", "is_attending is required").not().isEmpty(),
  body("is_attending", "is_attending must be boolean").isBoolean(),
];

// validateGuestInfoUpdate - body (guest_id, first_name, last_name, email, contact, diet)
const validateGuestInfoUpdate = [
  body("guest_id", "guest_id is required").not().isEmpty(),
  body("first_name", "first name is required").not().isEmpty(),
  body(
    "first_name",
    "enter first name that has a character length between 1 and 50"
  ).isLength({
    min: 1,
    max: 50,
  }),
  body("last_name", "last name is required").not().isEmpty(),
  body(
    "last_name",
    "enter last name that has a character length between 1 and 50"
  ).isLength({
    min: 1,
    max: 50,
  }),
  body("email", "email is required").not().isEmpty(),
  body("email", "need a valid email").isEmail(),
  body("contact", "contact is required").not().isEmpty(),
  body("diet", "dietary preference is required").not().isEmpty(),
];

// validateRemoveGuest - body(guest_id)
const validateRemoveGuest = [
  body("guest_id", "guest_id is required").not().isEmpty(),
];

module.exports = {
  validateIdInParam,
  validateIdInBody,
  validateAttendanceUpdate,
  validateGuestInfoUpdate,
  validateRemoveGuest,
};
