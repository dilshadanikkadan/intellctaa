"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUP = void 0;
const express_validator_1 = require("express-validator");
exports.validateSignUP = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
];
