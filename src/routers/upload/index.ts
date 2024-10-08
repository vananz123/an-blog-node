'use strict'
import { authentication } from '../../auth/authUtils'
const router = require('express').Router()
import { asyncHandler } from '../../helpers/asyncHandler'
import { uploadMemory } from '@/configs/multer.config'
import uploadController from '@/controllers/upload.controller'
//admin
router.post('/image', uploadMemory.single('file') , asyncHandler(uploadController.uploadImageFromLocalS3))
router.get('/image', asyncHandler(uploadController.getImageFromLocalS3))
//user
//router.use(authentication)
export default router