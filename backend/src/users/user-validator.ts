import * as z from "zod";
import { ROLES } from "../common/constants";

export const registerUserValidator = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    // emailId: z.email({ message: "Invalid email address" }),
    emailId: z
        .email({ message: "Invalid email address" })
        .toLowerCase()
        .trim()
        .max(255),
    password: z
        .string()
        .min(3, "Password must be atleast 3 characters.")
        .max(100, "Password must be max 100 characters"),
    age: z.number().min(5).optional(),
    role: z.enum([ROLES.ADMIN, ROLES.USER]).optional(),
    problemSolved: z.array(z.string()).optional(),
});
export type RegisterUserInput = z.infer<typeof registerUserValidator>;
