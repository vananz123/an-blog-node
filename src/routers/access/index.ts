'use strict'

const AccessController = require("../../controllers/access.controller")
const router = require('express').Router()

router.post('/user/signup',AccessController.signUp)
module.exports =router