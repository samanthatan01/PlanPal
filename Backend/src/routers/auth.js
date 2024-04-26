const express = require("express");
const {
  register,
  login,
  refresh,
  updateUserInfo,
} = require("../controllers/auth");
const { errorCheck } = require("../validators/errorCheck");
const { user } = require("../middleware/auth");
const {
  validateLogin,
  validateRefresh,
  validateAccountInfo,
} = require("../validators/auth");

const router = express.Router();

router.put("/register", validateAccountInfo, errorCheck, register);
router.post("/login", validateLogin, errorCheck, login);
router.post("/refresh", user, validateRefresh, errorCheck, refresh);
router.patch("/update", user, validateAccountInfo, errorCheck, updateUserInfo);

module.exports = router;
