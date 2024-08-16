import { Response } from 'express';
import HttpCode from './http.statusCode';
class SuccessResponse {
  message?: string;
  status: number;
  metadata?: Object | null | undefined | unknown;
  constructor({
    message,
    statusCode = HttpCode.STATUS_CODES.OK,
    reasonCode = HttpCode.REASON_PHRASES.OK,
    metadata = {},
  }: {
    message: string;
    statusCode: number;
    reasonCode?: string;
    metadata: Object | null | undefined | unknown;
  }) {
    this.message = message || reasonCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers = {}) {
    if (Object.keys(headers).length > 0) {
      res.set(headers);
    }
    return res.status(this.status).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata: Object | null | undefined | unknown }) {
    super({ message: message, statusCode: HttpCode.STATUS_CODES.OK, metadata: metadata });
  }
  static create({ message, metadata }: { message: string; metadata: Object | null | undefined | unknown }) {
    return new Ok({ message, metadata });
  }
}

class Created extends SuccessResponse {
  options: Object;
  constructor({ message, metadata, options = {} }: { message: string; metadata: Object | null | undefined | unknown; options?: Object }) {
    super({ message: message, statusCode: HttpCode.STATUS_CODES.OK, metadata: metadata });
    this.options = options;
  }
  static create({ message, metadata, options }: { message: string; metadata: Object | null | undefined | unknown; options?: Object }) {
    return new Created({ message, metadata, options });
  }
}
export { SuccessResponse, Ok, Created };
