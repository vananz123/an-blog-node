'use strict'
import blogController from '../../controllers/blog.controller'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'

router.get('', asyncHandler(blogController.getAllBlog))
router.get('/:slug', asyncHandler(blogController.getBlogBySlug))
router.use(authentication)
router.get('/get-by-id/:id', asyncHandler(blogController.getBlogById))
router.post('', asyncHandler(blogController.createBlog))
router.patch('', asyncHandler(blogController.updateBlogForUser))
router.delete('', asyncHandler(blogController.deleteBlogForUser))
router.post('/heart', asyncHandler(blogController.heartBlog))
export default router