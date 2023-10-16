export {}

declare global {
    namespace NodeJS{
        interface ProcessEnv{
            PORT: string;
            MONGO_URI: string;
            JWT_SECRET: string;
            TWILIO_ACCOUNT_SID: string;
            TWILIO_AUTH_TOKEN: string;
            TWILIO_PHONE_NUMBER: string;
            RESEND_API_KEY: string;
        }
    }
}