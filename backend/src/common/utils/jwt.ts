import createHttpError from "http-errors";
import { CONFIG } from "../../config";
import { JWTPayload } from "../../users/user-types";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: JWTPayload): string => {
    return jwt.sign(payload, CONFIG.JWT_SECRET, {
        expiresIn: Number(CONFIG.JWT_EXPIRY),
    });
};

export const verifyAccessToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, CONFIG.JWT_SECRET) as JWTPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw createHttpError(401, "Access token expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw createHttpError(401, "Invalid access token");
        }
        throw createHttpError(401, "Token verification failed");
    }
};
