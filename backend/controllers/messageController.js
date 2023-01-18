const mongoose = require("mongoose");
const Message = require("../models/messageModel");


// get all messages
const getMessages = async(req, res) => {
  const message = await Message.find({}).sort({createdAt: -1})

  if(!message){
    return res.status(404).json({error: "You have no message"})
  }

  res.status(200).json(message)
};

// get a message
const getMessage = async(req, res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such message'})
    }

    const message = await Message.findById(id)

    if(!message){
        return res.status(400).json({error:'No such message'})
    }
    res.status(200).json(message)
}

// send a message
const sendMessage =  async(req, res)=>{
    const{subject, content, isRead} = req.body

    try{
        const message = await Message.create({subject, content, isRead:false})
        res.status(200).json(message)

    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteMessage = async(req, res)=>{
    const {id} = req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such message'})
    }
    const message = await Message.findOneAndDelete({_id:id})

    if(!message){
        return res.status(400).json({error:'No such message'})
    }

    res.status(200).json(message)

}

module.exports = {
    getMessages,
    sendMessage,
    getMessage,
    deleteMessage

};
