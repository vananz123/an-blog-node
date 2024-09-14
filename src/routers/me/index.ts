'use strict'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import profileController from '../../controllers/profile.controller'
import grantAccess from '../../middlewares/rbac'
import meController from '@/controllers/me.controller'
router.get('/post/bookmarks',asyncHandler(meController.getAllBookmarkPostForUser))
router.use(authentication)
router.get('/posts',asyncHandler(profileController.getAllPosts))

router.post('/follow', asyncHandler(meController.follow)) //userId is follower , userIdFollow is being followed


router.post('/blog/bookmark', asyncHandler(meController.bookmarkBlog))
export default router