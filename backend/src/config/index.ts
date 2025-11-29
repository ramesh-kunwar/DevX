import { config } from "dotenv";
config();

const { PORT, NODE_ENV, DATABASE_URL, SALT_ROUND, JWT_SECRET, JWT_EXPIRY } =
    process.env;

export const CONFIG = {
    PORT: Number(PORT) || 3000,
    NODE_ENV,
    DATABASE_URL,
    SALT_ROUND,
    JWT_SECRET,
    JWT_EXPIRY: Number(JWT_EXPIRY) || 3600,
};
