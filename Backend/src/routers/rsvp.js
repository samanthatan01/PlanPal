const express = require("express");

const { user } = require("../middleware/auth");
const {
  submitResponse,
  getEventsForGuest,
  updateResponse,
} = require("../controllers/rsvp");
const {
  validateIdInParam,
  validateResponseInput,
} = require("../validators/rsvp");
const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.put(
  "/submit/:id",
  user,
  validateIdInParam,
  validateResponseInput,
  errorCheck,
  submitResponse
);
router.get("/", user, getEventsForGuest);
router.patch(
  "/update/:id",
  user,
  validateIdInParam,
  validateResponseInput,
  errorCheck,
  updateResponse
);

module.exports = router;
