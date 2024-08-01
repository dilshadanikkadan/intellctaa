"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const server_1 = __importDefault(require("@/_boot/server"));
const application_1 = __importDefault(require("@/presentation/application"));
const database_1 = __importDefault(require("@/_boot/database"));
const consumer_1 = __importDefault(require("@/_boot/consumer"));
const main = async () => {
    try {
        await (0, server_1.default)(application_1.default);
        await (0, database_1.default)();
        await consumer_1.default.listen();
        process.on("SIGTERM", async () => {
            console.info("SIGTERM received");
            // stopConsumer();
        });
    }
    catch (error) {
        console.log(`Oops!`, error?.message);
    }
};
exports.main = main;
