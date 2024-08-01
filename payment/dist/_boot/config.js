"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const environment_1 = require("@/_boot/environment");
exports.config = {
    http: {
        host: (0, environment_1.envString)('HOST', 'localhost'),
        port: (0, environment_1.envNumber)('PORT', 3000)
    },
    mongo: {
        database: (0, environment_1.envString)('MONGO_URL', 'auth'),
    },
    secrets: {
        access_token: (0, environment_1.envString)('ACCESS_TOKEN_SECRET', 'intellctaaa'),
        refresh_token: (0, environment_1.envString)('REFRESH_TOKEN_SECRET', 'testsecret'),
        forgot_password_token: (0, environment_1.envString)('FORGOT_PASSWORD_TOKEN_SECRET', 'testsecret2'),
        stripe_key: (0, environment_1.envString)('STRIPE_KEY', 'testsecret2'),
        front_end_url: (0, environment_1.envString)('FRONT_END_URL', 'testsecret2'),
        web_hook_url: (0, environment_1.envString)('STRIPE_WEBHOOK_SECRET', 'testsecret2'),
    },
    kafka: {
        broker_urls: (0, environment_1.envString)('KAFKA_BROKER_URLS', 'localhost:29092'),
        client_id: (0, environment_1.envString)('KAFKA_CLIENT_ID', 'kafka-course-client'),
    }
};
