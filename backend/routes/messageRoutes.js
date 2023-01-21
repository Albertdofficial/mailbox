const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all messages routes
router.use(requireAuth);

const {
  getMessages,
  sendMessage,
  getMessage,
  deleteMessage,
  updateMessage
} = require("../controllers/messageController");

router.get("/", getMessages);

router.get("/:id", getMessage);

router.delete("/:id", deleteMessage);

router.patch("/:id", updateMessage)

// send a new message
router.post("/", sendMessage);

module.exports = router;
