"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentConsumer = void 0;
const paymentSuccess_1 = require("@/infrastructure/database/mongo/repositories/usesr/paymentSuccess");
const paymentConsumer = async (payload) => {
    try {
        await (0, paymentSuccess_1.pyamentUpdateAuth)(payload);
    }
    catch (error) { }
};
exports.paymentConsumer = paymentConsumer;
