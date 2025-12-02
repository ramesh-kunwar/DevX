import { Request } from "express";
export const getTokenFromRequest = (req: Request): string | undefined => {
    const authHeader = req.headers.authorization;
    const tokenFromBearer = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;
    const tokenFromXHeader = req.headers["x-access-token"] as
        | string
        | undefined;
    const tokenFromCookie = req.cookies?.["token"];

    return tokenFromBearer || tokenFromXHeader || tokenFromCookie;
};
