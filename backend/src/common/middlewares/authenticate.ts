import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { getTokenFromRequest } from "../utils/getTokenFromRequest";
import { verifyAccessToken } from "../utils/jwt";
import { AuthenticatedRequest, AuthUserDTO } from "../../users/user-types";

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token) throw createHttpError(401, "Access token not provided");
        console.log(token);
        const payload = verifyAccessToken(token);

        // (req as unknown as AuthenticatedRequest).user = payload;
        const authReq = req as unknown as AuthenticatedRequest;
        authReq.user = {
            id: payload.id,
            emailId: payload.emailId,
            role: payload.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

export const getAuthUser = (req: Request): AuthUserDTO => {
    const authReq = req as unknown as AuthenticatedRequest;
    if (!authReq.user) {
        throw createHttpError(401, "User not authenticated");
    }
    return authReq.user;
};

/**
 * Role-based authorization middleware
 * Must be used after authenticate middleware
 */
export const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const user = getAuthUser(req);

            if (!allowedRoles.includes(user.role)) {
                throw createHttpError(403, "Insufficient permissions");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
