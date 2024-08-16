'use strict';
import { authentication } from '../../auth/authUtils';
const router = require('express').Router();
import { asyncHandler } from '../../helpers/asyncHandler';
import ProfileController from '../../controllers/profile.controller';
import grantAccess from '../../middlewares/rbac';
import rbacController from '../../controllers/rbac.controller';
//admin
router.post('/role', asyncHandler(rbacController.newRole));
//user
router.get('/roles', asyncHandler(rbacController.listRoles));

router.post('/resource', asyncHandler(rbacController.newResource));
//user
router.get('/resources', asyncHandler(rbacController.listResources));

//router.use(authentication)
export default router;
