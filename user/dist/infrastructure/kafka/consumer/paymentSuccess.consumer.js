"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentConsumer = void 0;
const paymentUpdate_1 = require("@/infrastructure/database/mongo/repositories/usesr/paymentUpdate");
const paymentConsumer = async (payload) => {
    try {
        await (0, paymentUpdate_1.pyamentUpdate)(payload);
    }
    catch (error) { }
};
exports.paymentConsumer = paymentConsumer;
