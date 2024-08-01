"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function default_1() {
    const mongo = global.__MONGO_URI__;
    if (mongo) {
        await mongoose_1.default.disconnect();
        await mongo.stop();
    }
}
exports.default = default_1;
