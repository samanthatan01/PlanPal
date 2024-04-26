const { body } = require("express-validator");

// validateAccountInfo -- body (first_name, last_name, email, password, contact, diet)
const validateAccountInfo = [
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
  body("password", "password is required").not().isEmpty(),
  body(
    "password",
    "enter a password that has a character length between 8 and 50"
  ).isLength({
    min: 8,
    max: 50,
  }),
  body("contact", "contact is required").not().isEmpty(),
  body("diet", "dietary preference is required").not().isEmpty(),
];

// validateLogin -- body (email, password)
const validateLogin = [
  body("email", "email is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

// validateRefresh -- body (refresh_token)
const validateRefresh = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateAccountInfo,
  validateLogin,
  validateRefresh,
};
