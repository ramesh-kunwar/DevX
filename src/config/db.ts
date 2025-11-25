import mongoose from "mongoose";
import { CONFIG } from ".";

export const initDb = async () => {
    await mongoose.connect(CONFIG.DATABASE_URL as string);
};
