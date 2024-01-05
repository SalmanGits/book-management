const express = require('express')
const router = express.Router()
const { signup, login } = require("../controllers/user.controllers.js")
const { userRegisterValidator, userLoginValidator } = require('../validators/userValidation.js')

router.post("/signup",userRegisterValidator, signup)
router.post("/login", userLoginValidator,login)

module.exports = router