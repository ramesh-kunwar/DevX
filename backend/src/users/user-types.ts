import mongoose from "mongoose";
import { RoleType } from "../common/constants";

export interface Users {
    _id?: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    emailId: string;
    password: string;
    age?: number;
    role?: RoleType;
    problemSolved?: string[];
}
