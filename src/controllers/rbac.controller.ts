import { createResource, createRole, resourceList, roleList } from '../services/rbac.service';
import { Created, Ok, SuccessResponse } from '../core/success.response';
import { NextFunction, Request, Response } from 'express';
/**
 * @param
 */
interface RbacQuery {
    userId: number;
    limit: number;
    offset: number;
    search: string;
}
class RbacController {
  newResource = async (req: Request, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create resource',
      metadata: await createResource(req.body),
    }).send(res);
  };
  listResources = async (req: Request<any,any,any,RbacQuery>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'create resource',
      metadata: await resourceList(req.query),
    }).send(res);
  };
  newRole = async (req: Request, res: Response, next: NextFunction) => {
    return Created.create({
      message: 'create resource',
      metadata: await createRole(req.body),
    }).send(res);
  };
  listRoles = async (req: Request<any,any,any,RbacQuery>, res: Response, next: NextFunction) => {
    return Ok.create({
      message: 'create resource',
      metadata: await roleList(req.query),
    }).send(res);
  };
}
export default new RbacController;
