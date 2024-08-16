import roleModel from '../models/role.model';
import resourceModel from '../models/resource.model';
import { findRoleByName } from '../models/reponsitory/role.repo';
export const createResource = async ({ name, slug, description }: { name: string; slug: string; description: string }) => {
  try {
    // check
    const resource = await resourceModel.create({
      src_name: name,
      src_slug: slug,
      src_description: description,
    });
    return resource;
  } catch (error) {
    return error;
  }
};
export const resourceList = async ({
  userId = 0,
  limit = 30,
  offset = 0,
  search = '',
}: {
  userId: number;
  limit: number;
  offset: number;
  search: string;
}) => {
  try {
    // userId admin , middleware
    const resource = await resourceModel.aggregate([
      {
        $project: {
          _id: 0,
          name: '$src_name',
          slug: '$src_slug',
          description: '$src_description',
          resourceId: '$_id',
          createAt: 1,
        },
      },
    ]);
    return resource;
  } catch (error) {
    return [];
  }
};
export const createRole = async ({
  name = 'admin',
  slug = 's00001',
  description,
  grants,
}: {
  name: string;
  slug: string;
  description: string;
  grants: Array<any>;
}) => {
  try {
    //1 check exist
    const roleExist = await findRoleByName(name)
    if(!roleExist) return null
    //2
    const role = await roleModel.create({
      rol_name: name,
      rol_slug: slug,
      rol_description: description,
      rol_grants: grants,
    });
    return role;
  } catch (error) {
    return error;
  }
};
export const roleList = async ({
  userId = 0,
  limit = 30,
  offset = 0,
  search = '',
}: {
  userId: number;
  limit?: number;
  offset?: number;
  search?: string;
}) => {
  try {
    const roles = await roleModel.aggregate([
      {
        $unwind: '$rol_grants',
      },
      {
        $lookup: {
          from: 'Resources',
          localField: 'rol_grants.resource',
          foreignField: '_id',
          as: 'resource',
        },
      },
      {
        $unwind: '$resource',
      },
      {
        $project: {
          role: '$rol_name',
          resource: '$resource.src_name',
          action: '$rol_grants.actions',
          attribute: '$rol_grants.attributes',
        },
      },
      {
        $unwind: '$action',
      },
      {
        $project: {
          _id: 0,
          role: '$role',
          resource: '$resource',
          action: '$action',
          attributes: '$attribute',
        },
      },
    ]);
    return roles;
  } catch (error) {
    return [];
  }
};
