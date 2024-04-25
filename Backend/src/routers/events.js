const express = require("express");
const {
  createEvent,
  getAllEventsHostedByUser,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { user } = require("../middleware/auth");

const router = express.Router();

router.put("/create", user, createEvent);
router.get("/all", user, getAllEventsHostedByUser);
router.patch("/update/:id", user, updateEvent);
router.delete("/delete/:id", user, deleteEvent);

module.exports = router;
