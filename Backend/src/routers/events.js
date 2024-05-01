const express = require("express");
const {
  createEvent,
  getAllEventsHostedByUser,
  updateEvent,
  deleteEvent,
  getEventById,
} = require("../controllers/events");
const { user } = require("../middleware/auth");
const {
  validateEventInput,
  validateIdInParam,
  validateDeleteEvent,
} = require("../validators/events");
const { errorCheck } = require("../validators/errorCheck");

const router = express.Router();

router.put("/create", user, validateEventInput, errorCheck, createEvent);
router.post("/all", user, getAllEventsHostedByUser);
router.get("/:id", user, validateIdInParam, errorCheck, getEventById);
router.patch(
  "/update/:id",
  user,
  validateIdInParam,
  validateEventInput,
  errorCheck,
  updateEvent
);
router.delete(
  "/delete/:id",
  user,
  validateIdInParam,
  validateDeleteEvent,
  errorCheck,
  deleteEvent
);

module.exports = router;
