const express = require("express");

const { user } = require("../middleware/auth");
const {
  getGuestlist,
  updateGuestAttendance,
  updateGuestInfo,
  deleteGuestFromEvent,
} = require("../controllers/guestlists");

const router = express.Router();

router.get("/:id", user, getGuestlist);
router.patch("/update-attendance", user, updateGuestAttendance);
router.patch("/update-information", user, updateGuestInfo);
router.delete("/delete-guest", user, deleteGuestFromEvent);

module.exports = router;
