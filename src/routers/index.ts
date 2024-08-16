'use strict'
import express from "express"
import access from './access'
import profile from './profile'
import test from '../test/server.start'
import rbac from './rbac'
import { apiKey, permissions } from "../auth/checkAuth"
const router = express.Router()
router.use('/v1/api',test)
router.use(apiKey)
router.use(permissions({permissions:'0000'}))
router.use('/v1/api/user',access)
router.use('/v1/api/profile',profile)
router.use('/v1/api/rbac',rbac)
export default router
