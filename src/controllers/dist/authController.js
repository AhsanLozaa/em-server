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
exports.test = exports.authenticateAccessToken = exports.signIn = exports.signUp = void 0;
var authService_1 = require("../services/authService");
var customError_1 = require("../utils/customError");
var authUtils_1 = require("../utils/authUtils");
// Controller function to create a new buyer
exports.signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBodyData, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                reqBodyData = req.body;
                return [4 /*yield*/, authService_1.registerUser(reqBodyData)];
            case 1:
                user = _a.sent();
                res.status(201).json(user);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof customError_1.CustomError) {
                    res
                        .status(error_1.statusCode)
                        .json({ message: 'Signup failed', error: error_1.message });
                }
                else {
                    res
                        .status(500)
                        .json({ message: 'Signup failed', error: 'Internal server error' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqBodyData, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                reqBodyData = req.body;
                return [4 /*yield*/, authService_1.login(reqBodyData)];
            case 1:
                data = _a.sent();
                res.status(201).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof customError_1.CustomError) {
                    res
                        .status(error_2.statusCode)
                        .json({ message: 'Signin failed', error: error_2.message });
                }
                else {
                    res
                        .status(500)
                        .json({ message: 'Signin failed', error: 'Internal server error' });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticateAccessToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, isTokenVerified, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!accessToken) return [3 /*break*/, 2];
                return [4 /*yield*/, authUtils_1.simplyVerifyAccessToken(accessToken)];
            case 1:
                isTokenVerified = _b.sent();
                console.log(isTokenVerified);
                res
                    .status(200)
                    .json({ message: 'Token Verification', success: isTokenVerified });
                return [3 /*break*/, 3];
            case 2:
                res
                    .status(500)
                    .json({ error: 'Token Verification Failed', success: false });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res
                    .status(500)
                    .json({ error: 'Token Verification Failed', success: false });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.test = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(200).json({
                message: 'Test Successful',
                error: "Testing Successful \u2705  (" + req.email + ")  (" + req.role + ")"
            });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: 'Signin failed', error: 'Internal server error' });
        }
        return [2 /*return*/];
    });
}); };
