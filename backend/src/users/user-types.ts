import mongoose from "mongoose";
import { RoleType, ROLES } from "../common/constants";

// ==========================================
// DATABASE DOCUMENT (Internal - What's in MongoDB)
// ==========================================
export interface UserDocument {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    role: RoleType;
    problemSolved: string[];
    createdAt: Date;
    updatedAt: Date;
}

// ==========================================
// DTOs - DATA TRANSFER OBJECTS
// ==========================================

// What user SENDS when registering
export interface RegisterUserDTO {
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    role?: RoleType;
    problemSolved?: string[];
}

// What user SENDS when logging in
export interface LoginUserDTO {
    emailId: string;
    password: string;
}

// What we RETURN to user (no password!)
export interface UserResponseDTO {
    id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    age?: number;
    role: RoleType;
    problemSolved: string[];
    createdAt: Date;
}

// For JWT payload / session (minimal info)
export interface AuthUserDTO {
    id: string;
    emailId: string;
    role: RoleType;
}
// Auth response interface
export interface AuthResponseDTO {
    accessToken: string;
    user: UserResponseDTO;
}
export interface JWTPayload {
    id: string;
    emailId: string;
    role: RoleType;
}

export interface AuthenticatedRequest extends Request {
    user: AuthUserDTO;
}

// ==========================================
// MAPPER FUNCTIONS (Transform data safely)
// ==========================================

/**
 * Converts a UserDocument to a safe UserResponseDTO
 * Removes sensitive fields like password
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toUserResponse = (user: any): UserResponseDTO => {
    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        age: user.age,
        role: user.role || ROLES.USER,
        problemSolved: user.problemSolved || [],
        createdAt: user.createdAt,
    };
};

/**
 * Converts a UserDocument to AuthUserDTO for JWT
 * Contains only authentication-relevant fields
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toAuthUser = (user: any): AuthUserDTO => {
    return {
        id: user._id.toString(),
        emailId: user.emailId,
        role: user.role || ROLES.USER,
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toJWTPayload = (user: any): JWTPayload => {
    return {
        id: user._id.toString(),
        emailId: user.emailId,
        role: user.role || ROLES.USER,
    };
};
