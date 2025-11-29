import createHttpError from "http-errors";
import userModel from "./user-model";
import { Users } from "./user-types";
import bcrypt from "bcryptjs";
import { CONFIG } from "../config";

export class UserService {
    async register(data: Users) {
        const existingUser = await userModel.findOne({ emailId: data.emailId });

        // check for existing user
        if (existingUser) {
            const err = createHttpError(409, "Email Already Exists!");
            throw err;
        }

        if (!data.emailId || !data.password) {
            const err = createHttpError(
                400,
                "Email and passwords are required.",
            );
            throw err;
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(
            data.password,
            Number(CONFIG.SALT_ROUND),
        );

        return await userModel.create({
            ...data,
            password: hashedPassword,
        });
    }
    async getAllUser() {
        return await userModel.find();
    }
}
