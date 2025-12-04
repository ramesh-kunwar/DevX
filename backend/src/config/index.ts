import { config } from "dotenv";
config();

const { PORT, NODE_ENV, DATABASE_URL, SALT_ROUND, JWT_SECRET, JWT_EXPIRY } =
    process.env;

// Validate critical environment variables
if (!JWT_SECRET) {
    throw new Error(
        "FATAL ERROR: JWT_SECRET is not defined in environment variables",
    );
}

if (!DATABASE_URL) {
    throw new Error(
        "FATAL ERROR: DATABASE_URL is not defined in environment variables",
    );
}

export const CONFIG = {
    PORT: Number(PORT) || 3000,
    NODE_ENV,
    DATABASE_URL,
    SALT_ROUND: Number(SALT_ROUND) || 10,
    JWT_SECRET,
    JWT_EXPIRY: JWT_EXPIRY || "7d",
};
