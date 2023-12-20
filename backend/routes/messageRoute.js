const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Create a new message
router.post("/createMessages", messageController.createMessage);

// Get all messages
router.get("/allMessages", messageController.getAllMessages);

module.exports = router;
