import type { Request, Response, NextFunction } from "express";
declare function authMiddleware(req: Request<{}> & {
    userId?: number;
}, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map