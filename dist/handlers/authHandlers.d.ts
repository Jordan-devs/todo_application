import type { Request, Response } from "express";
import type { LoginUserDTO, RegisterUserDTO } from "../dtos/dtos.js";
export declare function RegisterUsers(req: Request<{}, {}, RegisterUserDTO>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function LoginUsers(req: Request<{}, {}, LoginUserDTO>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function LogoutUsers(req: Request, res: Response): void;
//# sourceMappingURL=authHandlers.d.ts.map