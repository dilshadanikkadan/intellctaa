"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("@/_boot/config");
exports.default = async () => {
    try {
        console.log("mogno", config_1.config.mongo.database);
        const conn = await mongoose_1.default.connect(config_1.config.mongo.database);
        console.log(`🍃 Database Established connection with MongoDB`);
        console.log(`@-${conn.connection.host}`);
    }
    catch (error) {
        console.error(`❌ Database Connection failed`);
        console.error(error.message);
        process.exit(1);
    }
};
