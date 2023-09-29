namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        PORT: string;
        MONGO_URI: string;
        JWT_SECRET_KEY: string;
        CATEGORY_CUSTOMER_ID: string;
        CATEGORY_VENDOR_ID: string;
    }
}