const express = require("express");
const { register, login, refresh } = require("../controllers/auth");
const { user } = require("../middleware/auth");

const router = express.Router();

router.put("/register", register);
router.post("/login", login);
router.post("/refresh", user, refresh);

module.exports = router;
