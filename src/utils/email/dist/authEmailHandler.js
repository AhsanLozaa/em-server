"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sendEmailConfirmation = exports.sendPasswordResetEmail = void 0;
var nodemailer_1 = require("nodemailer"); // Make sure to install the 'nodemailer' library
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
exports.sendPasswordResetEmail = function (email, resetLink, otpExpirationMinutes) { return __awaiter(void 0, void 0, Promise, function () {
    var transporter, mailOptions, info, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = nodemailer_1["default"].createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL,
                        pass: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL_PASSWORD
                    }
                });
                mailOptions = {
                    from: 'your_email@example.com',
                    to: email,
                    subject: 'Email Confirmation OTP',
                    html: "\n          <div style=\"font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;\">\n            <div style=\"max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\">\n              <div style=\"text-align: center;\">\n                <img src=\"https://mediapantheon.com/wp-content/uploads/2023/05/Media-Pantheon-Inc-Logo-Black.png\" alt=\"Company Logo\" style=\"width: 200px; height: auto;\">\n              </div>\n              <h2 style=\"color: #333; margin-top: 20px; text-align: center;\">Email Confirmation OTP</h2>\n              <p style=\"color: #666; font-size: 16px;\">Follow this link to reset your password: <strong>" + resetLink + "</strong></p>\n              <p style=\"color: #666; font-size: 16px;\">The url is valid for " + otpExpirationMinutes + " minutes. After that, it will expire.</p>\n              <div style=\"text-align: center; margin-top: 30px;\">\n                <a href=\"" + resetLink + "\" style=\"background-color: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;\">Change Password</a>\n              </div>\n            </div>\n          </div>\n        "
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                info = _a.sent();
                console.log('Email sent:', info.messageId);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('Error sending email:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendEmailConfirmation = function (email, otp, otpExpirationMinutes) { return __awaiter(void 0, void 0, Promise, function () {
    var transporter, mailOptions, info, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = nodemailer_1["default"].createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        user: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL,
                        pass: process.env.SYSTEM_SERVICE_PROVIDER_EMAIL_PASSWORD
                    }
                });
                mailOptions = {
                    from: 'your_email@example.com',
                    to: email,
                    subject: 'Confirm Your Email Address',
                    html: "\n          <div style=\"font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;\">\n            <div style=\"max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\">\n              <div style=\"text-align: center;\">\n                <img src=\"https://mediapantheon.com/wp-content/uploads/2023/05/Media-Pantheon-Inc-Logo-Black.png\" alt=\"Company Logo\" style=\"width: 200px; height: auto;\">\n              </div>\n              <h2 style=\"color: #333; margin-top: 20px; text-align: center;\">Confirm Your Email Address</h2>\n              <p style=\"color: #666; font-size: 16px;\">If you didn't sign up for this account, you can safely ignore this email.</p>\n              <h2 style=\"color: #333; margin-top: 20px; text-align: center;\">Your OTP: " + otp + "</h2>\n              <p style=\"color: #666; font-size: 16px;\">The url is valid for " + otpExpirationMinutes + " minutes. After that, it will expire.</p>\n              <p style=\"color: #666; font-size: 16px;\">The OTP is valid for a limited time for additional security. Do not share it with anyone.</p>\n            </div>\n          </div>\n        "
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                info = _a.sent();
                console.log('Email sent:', info.messageId);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log('Error sending email:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
