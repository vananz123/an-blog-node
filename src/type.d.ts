import { Request } from "express";

declare namespace request {
    interface MiddlewaresRequest extends Request {
        objKey?: {
          permissions: Array<string>;
        };
        keyStore?: any;
        refreshToken?: string;
        user?: UserDecode;
      }
}
export =request