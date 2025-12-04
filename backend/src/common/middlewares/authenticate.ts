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

        const payload = verifyAccessToken(token);

        (req as unknown as AuthenticatedRequest).user = {
            id: payload.id,
            emailId: payload.emailId,
            role: payload.role,
        };

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Helper function to extract authenticated user from request
 * Must be used in routes protected by authenticateUser middleware
 * @param req - Express Request object
 * @returns AuthUserDTO - The authenticated user data
 */
export const getAuthUser = (req: Request): AuthUserDTO => {
    // Single cast - trust the middleware chain
    // If user is missing, it's a developer error (middleware not applied correctly)
    return (req as unknown as AuthenticatedRequest).user;
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
