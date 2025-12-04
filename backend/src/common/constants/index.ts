import { CookieOptions } from "express";
import { CONFIG } from "../../config";

export const ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;
export type RoleType = (typeof ROLES)[keyof typeof ROLES];

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: CONFIG.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
