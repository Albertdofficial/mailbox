const express = require('express')
const router = express.Router()

const{getMessages,
     sendMessage, 
     getMessage,
     deleteMessage} = require('../controllers/messageController')


router.get('/', getMessages)

router.get('/:id', getMessage)

router.delete('/:id', deleteMessage)

// send a new message
router.post('/', sendMessage)

module.exports = router

