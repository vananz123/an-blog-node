'use strict'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import grantAccess from '../../middlewares/rbac'
import meController from '@/controllers/me.controller'
router.get('/post/bookmarks',asyncHandler(meController.getAllBookmarkPostForUser))
router.use(authentication)
router.get('/posts',asyncHandler(meController.getAllPosts))

router.post('/follow', asyncHandler(meController.follow)) //userId is follower , userIdFollow is being followed
router.post('/blog/bookmark', asyncHandler(meController.bookmarkBlog))
router.post('/question/bookmark', asyncHandler(meController.bookmarkQuestion))
export default router