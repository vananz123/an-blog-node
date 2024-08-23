'use strict'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import commentController from '../../controllers/comment.controller'
import validateData from '@/middlewares/validation.middleware'
import { commentCreateSchema } from '@/schemas/comment.schemas'
import commentQuestionModel from '@/models/commentQuestion.model'
router.get('',asyncHandler(commentController.getComment))

router.delete('', asyncHandler(commentController.delComment))
router.use(authentication)
router.patch('',asyncHandler(commentController.updateComment))
router.post('', validateData(commentCreateSchema),asyncHandler(commentController.createComment))
export default router