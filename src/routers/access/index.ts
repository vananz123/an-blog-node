'use strict'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'

router.post('/signup',asyncHandler(AccessController.signUp))
router.post('/login',asyncHandler(AccessController.login))

router.use(authentication)
router.post('/logout',asyncHandler(AccessController.logout))
router.post('/refreshToken',asyncHandler(AccessController.refreshToken))
export default router