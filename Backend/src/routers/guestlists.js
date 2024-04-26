const express = require("express");

const { user } = require("../middleware/auth");
const {
  getGuestlist,
  updateGuestAttendance,
  updateGuestInfo,
  deleteGuestFromEvent,
} = require("../controllers/guestlists");
const {
  validateIdInParam,
  validateIdInBody,
  validateAttendanceUpdate,
  validateGuestInfoUpdate,
  validateRemoveGuest,
} = require("../validators/guestlists");
const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.get("/:id", user, validateIdInParam, errorCheck, getGuestlist);
router.patch(
  "/update-attendance",
  user,
  validateIdInBody,
  validateAttendanceUpdate,
  errorCheck,
  updateGuestAttendance
);
router.patch(
  "/update-information",
  user,
  validateIdInBody,
  validateGuestInfoUpdate,
  errorCheck,
  updateGuestInfo
);
router.delete(
  "/delete-guest",
  user,
  validateIdInBody,
  validateRemoveGuest,
  errorCheck,
  deleteGuestFromEvent
);

module.exports = router;
