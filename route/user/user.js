const express = require('express')
const registerUser = require('../../controller/user/register-user/registerUser')
const verifyUser = require('../../controller/user/verify-user/verifyUser')
const getConnection = require('../../middleware/connection/getConnection')
const login = require('../../controller/user/login-user/login')

const router = express.Router()

router.post('/register',getConnection,registerUser)
router.post('/verify',getConnection,verifyUser)
router.post('/login',getConnection,login)

module.exports = router