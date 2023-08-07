"use strict";
exports.__esModule = true;
exports.generateOTP = void 0;
exports.generateOTP = function () {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
};
