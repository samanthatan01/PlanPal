const express = require("express");

const { user } = require("../middleware/auth");
const {
  submitResponse,
  getEventsForGuest,
  updateResponse,
} = require("../controllers/rsvp");

const router = express.Router();

router.put("/submit/:id", user, submitResponse);
router.get("/", user, getEventsForGuest);
router.patch("/update/:id", user, updateResponse);

module.exports = router;
