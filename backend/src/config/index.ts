import { config } from "dotenv";
config();

const { PORT, NODE_ENV, DATABASE_URL } = process.env;

export const CONFIG = {
    PORT: Number(PORT) || 3000,
    NODE_ENV,
    DATABASE_URL,
};
