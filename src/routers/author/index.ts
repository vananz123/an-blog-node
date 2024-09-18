'use strict'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import authorController from '@/controllers/author.controller'
router.get('' , asyncHandler(authorController.authors))
router.use(authentication)
export default router