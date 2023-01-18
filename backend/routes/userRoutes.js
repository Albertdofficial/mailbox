const express = require('express')

const router = express.Router()

// controller functions
const {loginUser, signupUser, getUsers, deleteUser} = require('../controllers/userControllers')


// @route  /api/users/login
// method

router.get('/', getUsers)

router.delete('/:id', deleteUser)

router.post('/login', loginUser)

router.post('/signup', signupUser)

module.exports = router