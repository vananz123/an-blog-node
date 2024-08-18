'use strict'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import commentController from '../../controllers/comment.controller'
router.post('', asyncHandler(commentController.createComment))
router.get('', asyncHandler(commentController.getComment))
router.delete('', asyncHandler(commentController.delComment))
//router.use(authentication)
export default router