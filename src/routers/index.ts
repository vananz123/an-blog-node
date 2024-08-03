'use strict'
import express from "express"
const router = express.Router()
router.use('/v1/api',require('./access'))
module.exports =router
