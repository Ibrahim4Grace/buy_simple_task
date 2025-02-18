import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT ?? 8000,
    NODE_ENV: process.env.NODE_ENV,
    DEV_URL: process.env.DEV_URL,
    CORS_WHITELIST: process.env.CORS_WHITELIST,
    JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
} as const;
