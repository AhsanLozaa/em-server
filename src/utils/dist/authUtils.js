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
exports.decodeRefreshToken = exports.decodeAccessToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = exports.updateTokens = exports.createAndUpdateTokens = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var ACCESS_TOKEN_SECRET = 'POILKIKIJKK-121333-PPPOPOLFSdf';
var REFRESH_TOKEN_SECRET = 'OOPIENFNFf-99912-FDASPFFSPPPp';
// Generate an access token
function generateAccessToken(userId, email, role) {
    return jsonwebtoken_1["default"].sign({ userId: userId, email: email, role: role }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    }); // Token will expire in 15 minutes
}
exports.generateAccessToken = generateAccessToken;
// Generate a refresh token
function generateRefreshToken(userId, email, role) {
    return jsonwebtoken_1["default"].sign({ userId: userId, email: email, role: role }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    }); // Token will expire in 7 days
}
exports.generateRefreshToken = generateRefreshToken;
// Update the tokens for a user
function createAndUpdateTokens(user) {
    return __awaiter(this, void 0, Promise, function () {
        var newAccessToken, newRefreshToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user.role) return [3 /*break*/, 2];
                    newAccessToken = generateAccessToken(user.id, user.email, user.role);
                    newRefreshToken = generateRefreshToken(user.id, user.email, user.role);
                    // Update the user's tokens in the database
                    user.accessToken = newAccessToken;
                    user.refreshToken = newRefreshToken;
                    return [4 /*yield*/, user.save()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, { user: user }];
            }
        });
    });
}
exports.createAndUpdateTokens = createAndUpdateTokens;
function updateTokens(user, accessToken, refreshToken) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    return [4 /*yield*/, user.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { user: user }];
            }
        });
    });
}
exports.updateTokens = updateTokens;
function generateTokens(userId, email, role) {
    // Implement the token generation logic here
    // You can use the methods we defined earlier to generate the tokens
    var accessToken = generateAccessToken(userId, email, role);
    var refreshToken = generateRefreshToken(userId, email, role);
    return { accessToken: accessToken, refreshToken: refreshToken };
}
exports.generateTokens = generateTokens;
function verifyAccessToken(accessToken) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1["default"].verify(accessToken, ACCESS_TOKEN_SECRET, function (error, decoded) {
            if (error) {
                reject(new Error('Invalid access token'));
            }
            else {
                // Extract the userId and email from the decoded token
                var _a = decoded, userId = _a.userId, email = _a.email, role = _a.role;
                resolve({ userId: userId, email: email, role: role });
            }
        });
    });
}
exports.verifyAccessToken = verifyAccessToken;
// Function to verify the refresh token
function verifyRefreshToken(refreshToken) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1["default"].verify(refreshToken, REFRESH_TOKEN_SECRET, function (error, decoded) {
            if (error) {
                reject(new Error('Invalid refresh token'));
            }
            else {
                // Extract the userId and email from the decoded token
                var _a = decoded, userId = _a.userId, email = _a.email, role = _a.role;
                resolve({ userId: userId, email: email, role: role });
            }
        });
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
// Function to decode the access token
function decodeAccessToken(accessToken) {
    try {
        if (accessToken) {
            var decoded = jsonwebtoken_1["default"].verify(accessToken, ACCESS_TOKEN_SECRET);
            return decoded;
        }
        else {
            return { userId: null, email: null, role: null };
        }
    }
    catch (error) {
        console.error('Error decoding access token:', error);
        return { userId: null, email: null, role: null };
    }
}
exports.decodeAccessToken = decodeAccessToken;
// Function to decode the refresh token
function decodeRefreshToken(refreshToken) {
    try {
        if (refreshToken) {
            var decoded = jsonwebtoken_1["default"].verify(refreshToken, REFRESH_TOKEN_SECRET);
            return decoded;
        }
        else {
            return { userId: null, email: null, role: null };
        }
    }
    catch (error) {
        console.error('Error decoding refresh token:', error);
        return { userId: null, email: null, role: null };
    }
}
exports.decodeRefreshToken = decodeRefreshToken;
