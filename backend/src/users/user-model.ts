import mongoose from "mongoose";
import { UserDocument } from "./user-types";

import { ROLES } from "../common/constants";

const userSchema = new mongoose.Schema<UserDocument>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            select: false,
        },
        emailId: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            immutable: true,
            lowercase: true,
        },
        age: {
            type: Number,
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER,
        },
        problemSolved: {
            type: [String],
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

// export default mongoose.model<UserDocument>("User", userSchema);
export default mongoose.model<UserDocument>("User", userSchema);
