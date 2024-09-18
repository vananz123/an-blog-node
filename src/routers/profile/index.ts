'use strict'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import profileController from '../../controllers/profile.controller'
import grantAccess from '../../middlewares/rbac'



router.get('/:slug' , asyncHandler(profileController.profileBySlug))
router.get('/:slug/posts' , asyncHandler(profileController.getAllPostsByUserSlug))
//admin
router.get('/view-any', grantAccess('readAny','profile') , asyncHandler(profileController.profiles))
//user
router.get('/view-own',grantAccess('readOwn','profile'),asyncHandler(profileController.profile))
router.patch('/update-own', asyncHandler(profileController.updateProfile))
router.use(authentication)
export default router