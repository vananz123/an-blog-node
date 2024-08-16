'use strict'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import profileController from '../../controllers/profile.controller'
import grantAccess from '../../middlewares/rbac'
//admin
router.get('/view-any', grantAccess('readAny','profile') , asyncHandler(profileController.profiles))
//user
router.get('/view-own',grantAccess('readOwn','profile'),asyncHandler(profileController.profile))

//router.use(authentication)
export default router