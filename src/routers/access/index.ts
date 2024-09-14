'use strict'
import validateData from '../../middlewares/validation.middleware'
import { authentication } from '../../auth/authUtils'
import AccessController from '../../controllers/access.controller'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import { userLoginSchema } from '../../schemas/user.schemas'

router.post('/signup',asyncHandler(AccessController.signUp))
router.post('/login',validateData(userLoginSchema),asyncHandler(AccessController.login))
router.post('/login-google',asyncHandler(AccessController.loginGoogle))
router.use(authentication)
router.post('/logout',asyncHandler(AccessController.logout))
router.post('/refreshToken',asyncHandler(AccessController.refreshToken))
export default router