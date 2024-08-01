"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
function generateOTP({ length = 4, allowDuplicates = false, excludeSimilar = false, } = {}) {
    const digits = excludeSimilar ? "23456789" : "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        let digit;
        do {
            digit = digits[Math.floor(Math.random() * digits.length)];
        } while (!allowDuplicates && otp.includes(digit));
        otp += digit;
    }
    return otp;
}
