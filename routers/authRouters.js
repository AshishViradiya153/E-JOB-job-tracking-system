
const { register, login, updateUser } = require('../controllers/authcontroller')
const express = require('express')
const router = express.Router()
const authenticatedUser = require('../middleware/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticatedUser, updateUser)


module.exports = router

