import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import userModel from "./user-model";
import {
    AuthResponseDTO,
    AuthUserDTO,
    LoginUserDTO,
    RegisterUserDTO,
    UserResponseDTO,
    toJWTPayload,
    toUserResponse,
} from "./user-types";
import { CONFIG } from "../config";
import { ROLES } from "../common/constants";
import { generateAccessToken, verifyAccessToken } from "../common/utils/jwt";

export class UserService {
    async register(data: RegisterUserDTO): Promise<AuthResponseDTO> {
        // Normalize email
        const normalizedEmail = data.emailId.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await userModel.findOne({
            emailId: normalizedEmail,
        });

        if (existingUser) {
            throw createHttpError(409, "Email already exists!");
        }

        // Validate required fields (defense in depth)
        if (!data.emailId || !data.password) {
            throw createHttpError(400, "Email and password are required.");
        }

        // Hash password asynchronously
        const hashedPassword = await bcrypt.hash(
            data.password,
            Number(CONFIG.SALT_ROUND),
        );

        // Create user with normalized and processed data
        const user = await userModel.create({
            firstName: data.firstName,
            lastName: data.lastName,
            emailId: normalizedEmail,
            password: hashedPassword,
            // age: data.age,
            ...(data.age !== undefined && { age: data.age }), // ← FIXED

            role: data.role || ROLES.USER,
            problemSolved: data.problemSolved || [],
        });

        // Generate Tokens
        const payload = toJWTPayload(user);
        const accessToken = generateAccessToken(payload);

        // Return safe DTO (no password)
        return {
            accessToken,
            user: toUserResponse(user),
        };
    }

    async login(data: LoginUserDTO): Promise<AuthResponseDTO> {
        const normalizedEmail = data.emailId.toLowerCase().trim();

        const user = await userModel
            .findOne({
                emailId: normalizedEmail,
            })
            .select("+password");

        const isMatchedPassword = await bcrypt.compare(
            data.password,
            user?.password as string,
        );

        if (!isMatchedPassword) {
            const error = createHttpError(401, "Invalid Credentials.");
            throw error;
        }

        // Generate Tokens
        const payload = toJWTPayload(user);
        const accessToken = generateAccessToken(payload);

        // Return safe DTO (no password)
        return {
            accessToken,
            user: toUserResponse(user),
        };
    }

    async logout(token: string) {
        if (!token) {
            const err = createHttpError(401, "Token not found");
            throw err;
        }

        verifyAccessToken(token);

        return {
            message: "User logged out successfully",
        };
    }

    async getAllUsers(): Promise<UserResponseDTO[]> {
        // Note: password is excluded by default (select: false in schema)
        const users = await userModel.find();

        // Map each user to safe DTO
        return users.map(toUserResponse);
    }

    async getUserProfile(data: AuthUserDTO): Promise<UserResponseDTO> {
        const user = await userModel.findById(data.id);

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        return toUserResponse(user);
    }

    async getUserById(userId: string): Promise<UserResponseDTO | null> {
        const user = await userModel.findById(userId);
        return user ? toUserResponse(user) : null;
    }

    async getUserByEmail(emailId: string): Promise<UserResponseDTO | null> {
        const user = await userModel.findOne({ emailId });
        return user ? toUserResponse(user) : null;
    }
}
