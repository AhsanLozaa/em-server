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
exports.registerUser = void 0;
var buyers_1 = require("../db/models/buyers");
var seller_1 = require("../db/models/seller");
var users_1 = require("../db/models/users");
var bcrypt_1 = require("bcrypt");
var customError_1 = require("../utils/customError");
// Service function to create a new buyer
exports.registerUser = function (authData) { return __awaiter(void 0, void 0, void 0, function () {
    var name, email, phoneNumber, password, role, existingEmailUser, existingPhoneUser, hashedPassword, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = authData.name, email = authData.email, phoneNumber = authData.phoneNumber, password = authData.password, role = authData.role;
                return [4 /*yield*/, users_1["default"].findOne({ where: { email: email } })];
            case 1:
                existingEmailUser = _a.sent();
                if (existingEmailUser) {
                    throw new customError_1.CustomError('Email already in use', 400);
                }
                return [4 /*yield*/, users_1["default"].findOne({ where: { phoneNumber: phoneNumber } })];
            case 2:
                existingPhoneUser = _a.sent();
                console.log(existingPhoneUser === null || existingPhoneUser === void 0 ? void 0 : existingPhoneUser.email);
                if (existingPhoneUser) {
                    throw new customError_1.CustomError('Phone number already in use', 400);
                }
                return [4 /*yield*/, bcrypt_1["default"].hash(password, 10)];
            case 3:
                hashedPassword = _a.sent();
                return [4 /*yield*/, users_1["default"].create({
                        name: name,
                        email: email,
                        phoneNumber: phoneNumber,
                        role: role,
                        password: hashedPassword
                    })];
            case 4:
                newUser = _a.sent();
                if (!(role === 'seller')) return [3 /*break*/, 6];
                return [4 /*yield*/, seller_1["default"].create({ userId: newUser.id })];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6:
                if (!(role === 'buyer')) return [3 /*break*/, 8];
                return [4 /*yield*/, buyers_1["default"].create({ userId: newUser.id })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/, { message: 'Signup successful' }];
        }
    });
}); };