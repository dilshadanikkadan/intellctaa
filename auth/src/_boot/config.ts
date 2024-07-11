import { envString, envNumber } from "@/_boot/environment";
//
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
        google_cleint_id: envString('GOOGLE_CLIENT_ID', 'testsecret'),
        google_cleint_secret: envString('GOOGLE_CLIENT_SECRET', 'testsecret'),
        forgot_password_token: envString('FORGOT_PASSWORD_TOKEN_SECRET', 'testsecret2')
    },
    kafka: { 
        broker_urls: envString('KAFKA_BROKER_URLS', 'localhost:29092'),
        client_id: envString('KAFKA_CLIENT_ID', 'kafka-course-client'),
    }
};