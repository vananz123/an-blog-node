'use strict'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import questionController from '@/controllers/question.controller'
router.get('', asyncHandler(questionController.getQuestion))
router.use(authentication)
router.post('', asyncHandler(questionController.createQuestion))
export default router