import { envString, envNumber } from "@/_boot/environment";

export const config = {
    http: {
        host: envString('HOST', 'localhost'),
        port: envNumber('PORT', 3000)
    },
    mongo: {
        database: envString('MONGO_URL', 'auth'),
    },
    secrets: {
        access_token: envString('ACCESS_TOKEN_SECRET', 'intellctaaa'),
        refresh_token: envString('REFRESH_TOKEN_SECRET', 'testsecret'),
        forgot_password_token: envString('FORGOT_PASSWORD_TOKEN_SECRET', 'testsecret2'),
        stripe_key: envString('STRIPE_KEY', 'testsecret2'),
        front_end_url: envString('FRONT_END_URL', 'testsecret2'),
        web_hook_url: envString('STRIPE_WEBHOOK_SECRET', 'testsecret2'),
    },
    kafka: { 
        broker_urls: envString('KAFKA_BROKER_URLS', 'localhost:29092'),
        client_id: envString('KAFKA_CLIENT_ID', 'kafka-course-client'),
        username: envString('KAFKA_USERNAME', 'kafka-course-client'),
        password: envString('KAFKA_PASSWORD', 'kafka-course-client'),
    }
};