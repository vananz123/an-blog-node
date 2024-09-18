import { Document, Query } from 'mongoose';
import { never } from 'zod';

interface PaginateOptions {
  offset?: number;
  limit?: number;
  sort?: object;
}

interface PaginateResult<T> {
  offset: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  results: T[];
}

class Pagination<T extends Document> {
  private query: Query<T[], T> | undefined;
  private data: T[];
  constructor({ query, data }: { query?: Query<T[], T>; data?: T[] }) {
    this.query = query;
    this.data = data || [];
  }

  async paginateByQuery(options: PaginateOptions = {}): Promise<PaginateResult<T>> {
    const offset = options.offset || 1;
    const limit = options.limit || 10;
    const sort = options.sort || {};

    const skip = (offset - 1) * limit;
    if (typeof this.query === 'undefined')
      return {
        offset,
        limit,
        totalItems: 0,
        totalPages: 0,
        results: [],
      };
    // Thực hiện truy vấn trên Mongoose query
    const [results, totalItems] = await Promise.all([
      this.query
        .sort({ ...sort })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.query.model.countDocuments(this.query.getQuery()).exec(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      offset,
      limit,
      totalItems,
      totalPages,
      results,
    };
  }
  paginateByData(options: PaginateOptions = {}) {

    const offset =options.offset || 1;
    const limit = options.limit || 10;
    const totalItems = this.data.length;
    const totalPages = Math.ceil(totalItems / limit);
    const skip = (offset - 1) * limit;
    const results = this.data.slice(skip, skip + limit);
    return {
      offset,
      limit,
      totalItems,
      totalPages,
      results,
    };
  }
}

export default Pagination;
