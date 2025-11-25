import mongoose from "mongoose";
import { Users } from "./user-types";
import { ROLES } from "../common/constants";

const userSchema = new mongoose.Schema<Users>(
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
        },
        emailId: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            immutable: true,
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
    },
    {
        timestamps: true,
    },
);

export default mongoose.model("User", userSchema);
