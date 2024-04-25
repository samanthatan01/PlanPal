const express = require("express");

const { user } = require("../middleware/auth");
const {
  getGuestlist,
  updateGuestAttendance,
  updateGuestInfo,
} = require("../controllers/guestlists");

const router = express.Router();

router.get("/:id", user, getGuestlist);
router.patch("/update-attendance", user, updateGuestAttendance);
router.patch("/update-information", user, updateGuestInfo);

module.exports = router;
