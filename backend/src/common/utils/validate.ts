import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.parse(req.body);
            req.body = result;
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({ errors: err });
            }
            next(err);
        }
    };
};
