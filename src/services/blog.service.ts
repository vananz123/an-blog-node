import { findById } from '../models/reponsitory/user.repo';
import { BlogRequest } from '../core/type.request';
import { NotFoundError } from '../core/error.response';
import { newBlog } from '../models/reponsitory/blog.repo';

class BlogService {
  static createBlog = async ({ userId, title, body, thumb }: BlogRequest) => {
    const user = await findById(userId);
    console.log(userId)
    if (!user) throw new NotFoundError('not exits user');
    const blog = await newBlog({ userId, title, body, thumb });
    return blog
  };
}
export default BlogService