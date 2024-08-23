'use strict'
import blogController from '../../controllers/blog.controller'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'


router.use(authentication)
router.post('', asyncHandler(blogController.createBlog))
export default router