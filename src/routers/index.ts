'use strict'
import express from "express"
import access from './access'
import profile from './profile'
import test from '../tests/server.start'
import rbac from './rbac'
import blog from './blog'
import question from './question'
import comment from './comment'
import upload from './upload'
import { apiKey, permissions } from "../auth/checkAuth"
const router = express.Router()
router.use('/v1/api',test)
router.use(apiKey)
router.use(permissions({permissions:'0000'}))
router.use('/v1/api/user',access)
router.use('/v1/api/profile',profile)
router.use('/v1/api/rbac',rbac)
router.use('/v1/api/comment',comment)
router.use('/v1/api/blog',blog)
router.use('/v1/api/question',question)
router.use('/v1/api/upload',upload)
export default router
