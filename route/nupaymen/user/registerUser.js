const express = require('express')
const registerUser = require('../../../controller/nuPayments/user/register/register')
const loginUser = require('../../../controller/nuPayments/user/login/login')



const router = express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
module.exports  =router