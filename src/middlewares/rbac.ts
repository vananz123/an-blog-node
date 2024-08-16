import { AccessControl, Permission, Query } from 'accesscontrol';
import { NextFunction, Request } from 'express';
import rbac from './role.middleware';
import { AuthFailureError, BadRequestError } from '../core/error.response';
import { roleList } from '../services/rbac.service';

const grantAccess = (action: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //need to cached
      rbac.setGrants(await roleList({ userId: 11111}));
      const rol_name = req.query.role as string;
      if (!rol_name) {
        throw new BadRequestError('role not exits');
      }
      const permission = rbac.can(rol_name)[action as keyof Query](resource) as Permission;
      if (!permission.granted) {
        throw new AuthFailureError('you dont have role permission');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default grantAccess;
