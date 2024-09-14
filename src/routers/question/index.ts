'use strict'
import validateData from '@/middlewares/validation.middleware'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import questionController from '@/controllers/question.controller'
import { questionCreateSchema } from '@/schemas/question.schema'
router.get('', asyncHandler(questionController.getQuestion))
router.get('/:slug', asyncHandler(questionController.getQuestionBySlug))
router.use(authentication)
router.post('', validateData(questionCreateSchema), asyncHandler(questionController.createQuestion))
router.get('/get-by-id/:id', asyncHandler(questionController.getQuestionById))
router.patch('', asyncHandler(questionController.updateQuestion))
router.delete('', asyncHandler(questionController.deleteQuestion))
export default router
