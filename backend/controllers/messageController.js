const mongoose = require("mongoose");
const Message = require("../models/messageModel");


//@desc get all messages
//@method GET
//@route /api/message
const getMessages = async (req, res) => {
  try {
    const user_id = req.user._id;
    const message = await Message.find({ user_id });

    if (!message) {
      return res.status(404).json({ error: "You have no message" });
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//@desc get a message
//@method GET
//@route /api/message
const getMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  try {
    const message = await Message.findById(id);

    if (!message) {
      return res.status(400).json({ error: "No such message" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//@desc send a message
//@method POST
//@route /api/message
const sendMessage = async (req, res) => {
  const { subject, content, isRead } = req.body;

  // add message to db
  try {
    const user_id = req.user._id;
    const message = await Message.create({
      subject,
      content,
      isRead: false,
      user_id,
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//@desc update a message
//@method PATCH
//@route /api/message/:id
const updateMessage = async (req, res) => {
  const { id } = req.params;
  const isRead = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }

  try {
    const message = await Message.findOneAndUpdate(
      { _id: id },
      isRead,
      { new: true }
    );
    if (message.isRead) {
      res.status(200).json(message );
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//@desc delete a message
//@method DELETE
//@route /api/message/:id
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such message" });
  }
  const message = await Message.findOneAndDelete({ _id: id });

  if (!message) {
    return res.status(400).json({ error: "No such message" });
  }

  res.status(200).json(message);
};


module.exports = {
  getMessages,
  sendMessage,
  getMessage,
  deleteMessage,
  updateMessage,
};
