import type { Request, Response } from "express";
import type { Todo } from "../types/types.js";
import type { ParamsIdDTO } from "../dtos/dtos.js";
export declare function getTodos(req: Request<{}, {}, Todo> & {
    userId?: number;
}, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createTodo(req: Request<{}, {}, Todo> & {
    userId?: number;
}, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateTodo(req: Request<ParamsIdDTO, {}, Todo> & {
    userId?: number;
}, res: Response): Promise<void>;
export declare function deleteTodo(req: Request<ParamsIdDTO, {}, Todo> & {
    userId?: number;
}, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=todoHandlers.d.ts.map