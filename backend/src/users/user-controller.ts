import { NextFunction, Request, Response } from "express";
import { UserService } from "./user-service";
import { Logger } from "winston";
import { getAuthUser } from "../common/middlewares/authenticate";
import { COOKIE_OPTIONS } from "../common/constants";

export class UserController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {
        // Bind methods to preserve 'this' context
        this.register = this.register.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.getUserById = this.getUserById.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            // Service returns safe DTO already
            const userResponse = await this.userService.register(req.body);

            res.cookie("token", userResponse.accessToken, COOKIE_OPTIONS);

            this.logger.info("User registered successfully.");
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: userResponse, // Already safe, no password
            });
        } catch (error) {
            next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userResponse = await this.userService.login(req.body);

            res.cookie("token", userResponse.accessToken, COOKIE_OPTIONS);

            this.logger.info("User logged in successfully");
            res.status(200).json({
                success: true,
                message: "User Loggedin Successfully",
                data: userResponse,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.token;
            await this.userService.logout(token);

            // clearCookie needs same options except maxAge
            const { maxAge, ...clearCookieOptions } = COOKIE_OPTIONS;
            res.clearCookie("token", clearCookieOptions);

            this.logger.info("User logged out successfully");

            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const authUser = getAuthUser(req);

            const profile = await this.userService.getUserProfile(authUser);
            res.status(200).json({
                success: true,
                message: "Profile fetched successfully",
                data: profile,
            });
        } catch (error) {
            next(error);
        }
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: {
                    users,
                    count: users.length,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await this.userService.getUserById(
                req.params.id as string,
            );

            res.status(200).json({
                success: true,
                msg: "User By Id",
                userId,
            });
        } catch (error) {
            next(error);
        }
    }
}
