const express = require('express')
const registerUser = require('../../controller/user/register-user/registerUser')
const verifyUser = require('../../controller/user/verify-user/verifyUser')
const getConnection = require('../../middleware/connection/getConnection')
const login = require('../../controller/user/login-user/login')

const router = express.Router()

router.post('/register',registerUser)
router.post('/verify',verifyUser)
router.post('/login',login)

module.exports = router