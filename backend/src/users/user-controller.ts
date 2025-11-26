import { NextFunction, Request, Response } from "express";
import { UserService } from "./user-service";

export class UserController {
    constructor(private userService: UserService) {
        this.register = this.register.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                firstName,
                lastName,
                emailId,
                password,
                age,
                role,
                problemSolved,
            } = req.body;

            const user = await this.userService.register({
                firstName,
                lastName,
                emailId,
                password,
                age,
                role,
                problemSolved,
            });

            res.json(user);
        } catch (error) {
            return next(error);
        }
    }
}
