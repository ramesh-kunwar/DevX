import { NextFunction, Request, Response } from "express";
import { UserService } from "./user-service";

export class UserController {
    constructor(private userService: UserService) {
        // Bind methods to preserve 'this' context
        this.register = this.register.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            // Service returns safe DTO already
            const userResponse = await this.userService.register(req.body);

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
            res.status(200).json({
                success: true,
                message: "User Loggedin Successfully",
                data: userResponse,
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
}
