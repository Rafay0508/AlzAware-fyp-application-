const { register, login } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/text", (req, res) => {
  res.json({ message: "hello" });
});

module.exports = router;
