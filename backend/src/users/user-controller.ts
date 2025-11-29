import { NextFunction, Request, Response } from "express";
import { UserService } from "./user-service";

export class UserController {
    constructor(private userService: UserService) {
        this.register = this.register.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.register(req.body);

            res.status(201).json({
                success: true,
                msg: "User Registered Successfully",
                data: {
                    id: user._id,
                    emailId: user.emailId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            });
        } catch (error) {
            return next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUser();

            res.status(200).json({
                success: true,
                masg: "User fetched successfully",
                data: {
                    users,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
