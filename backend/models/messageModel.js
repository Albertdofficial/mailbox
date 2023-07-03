const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
  },
  user_id: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("message", messageSchema);

