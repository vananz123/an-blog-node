import HttpCode from './http.statusCode';

class ErrorResponse extends Error {
  public status: number;
  public detail: object | undefined;
  constructor(message: string, status: number, detail?: object) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
}
class ConflictRequestError extends ErrorResponse {
  constructor(message = HttpCode.REASON_PHRASES.CONFLICT, status = HttpCode.STATUS_CODES.CONFLICT) {
    super(message, status);
  }
}
class BadRequestError extends ErrorResponse {
  constructor(message = HttpCode.REASON_PHRASES.BAD_REQUEST, status = HttpCode.STATUS_CODES.BAD_REQUEST ,detail?: object ) {
    super(message, status ,detail);
  }
}
class AuthFailureError extends ErrorResponse {
  constructor(message = HttpCode.REASON_PHRASES.UNAUTHORIZED, status = HttpCode.STATUS_CODES.UNAUTHORIZED) {
    super(message, status);
  }
}
class NotFoundError extends ErrorResponse {
  constructor(message = HttpCode.REASON_PHRASES.NOT_FOUND, status = HttpCode.STATUS_CODES.NOT_FOUND) {
    super(message, status);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(message = HttpCode.REASON_PHRASES.FORBIDDEN, status = HttpCode.STATUS_CODES.FORBIDDEN) {
    super(message, status);
  }
}
export { ErrorResponse, ConflictRequestError, ForbiddenError, BadRequestError, NotFoundError, AuthFailureError };
