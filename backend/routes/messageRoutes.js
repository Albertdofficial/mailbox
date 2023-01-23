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

router.post("/", sendMessage);

router.get("/", getMessages);

router.get("/:id", getMessage);

router.patch("/:id", updateMessage)

router.delete("/:id", deleteMessage);




module.exports = router;
