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
exports.validateRefreshToken = exports.validateAccessToken = exports.findAddressByUserId = exports.getUserAddress = void 0;
var authUtils_1 = require("./authUtils");
var users_1 = require("../db/models/users");
// Middleware to validate access token and handle token refreshing
// export const validateAccessToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const accessToken = req.headers.authorization?.split(' ')[1];
//   const refreshToken = req.headers['x-refresh-token'];
//   if (!accessToken) {
//     return res.status(401).json({ message: 'Access token not provided' });
//   }
//   try {
//     // Verify the access token
//     const { userId, email, role } = await verifyAccessToken(accessToken);
//     req.userId = userId;
//     req.email = email;
//     req.role = role;
//     // (req as any).userId = userId;
//     // (req as any).email = email;
//     next();
//   } catch (error: any) {
//     // Access token verification failed
//     if (!refreshToken) {
//       // Refresh token is not provided, or both tokens are expired
//       return res
//         .status(401)
//         .json({ message: 'Access token expired. Please log in again.' });
//     }
//     try {
//       // Verify the refresh token
//       const { userId, email, role } = await verifyRefreshToken(
//         refreshToken.toString(),
//       );
//       // (req as any).userId = userId;
//       // (req as any).email = email;
//       req.userId = userId;
//       req.email = email;
//       req.role = role;
//       // Generate a new access token
//       const newAccessToken = generateAccessToken(userId, email, role);
//       // Optionally, update the response with the new access token
//       res.set('Authorization', `Bearer ${newAccessToken}`);
//       // Update the user with the new tokens
//       // const user = /* Retrieve the user from the database using userId */;
//       User.findByPk(userId).then(async (user) => {
//         if (user) {
//           await updateTokens(user, newAccessToken, refreshToken.toString());
//         } else {
//           return res
//             .status(401)
//             .json({ message: 'Access token expired. Please log in again.' });
//         }
//       });
//       next();
//     } catch (error: any) {
//       // Refresh token verification failed
//       return res.status(401).json({
//         message: 'Refresh token expired or invalid. Please log in again.',
//       });
//     }
//   }
// };
function getUserAddress(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, address, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.userId;
                    return [4 /*yield*/, findAddressByUserId(userId)];
                case 1:
                    address = _a.sent();
                    if (!address) {
                        return [2 /*return*/, res.status(404).json({ message: 'Address not found' })];
                    }
                    res.status(200).json({
                        address: address
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error finding address:', error_1);
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserAddress = getUserAddress;
// addressService.ts
var addresses_1 = require("../db/models/addresses");
function findAddressByUserId(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var address, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, addresses_1["default"].findOne({
                            where: { userId: userId }
                        })];
                case 1:
                    address = _a.sent();
                    return [2 /*return*/, address];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error finding address:', error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.findAddressByUserId = findAddressByUserId;
// validateAccessToken.ts
exports.validateAccessToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, refreshToken, _a, userId, email, role, error_3, _b, userId, email, role, newAccessToken, user, error_4;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                accessToken = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
                refreshToken = req.headers['x-refresh-token'];
                if (!accessToken) {
                    return [2 /*return*/, res.status(401).json({ message: 'Access token not provided' })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 12]);
                return [4 /*yield*/, authUtils_1.verifyAccessToken(accessToken)];
            case 2:
                _a = _d.sent(), userId = _a.userId, email = _a.email, role = _a.role;
                req.userId = userId;
                req.email = email;
                req.role = role;
                next();
                return [3 /*break*/, 12];
            case 3:
                error_3 = _d.sent();
                // Access token verification failed
                if (!refreshToken) {
                    // Refresh token is not provided, or both tokens are expired
                    return [2 /*return*/, res
                            .status(401)
                            .json({ message: 'Access token expired. Please log in again.' })];
                }
                _d.label = 4;
            case 4:
                _d.trys.push([4, 10, , 11]);
                return [4 /*yield*/, authUtils_1.verifyRefreshToken(refreshToken.toString())];
            case 5:
                _b = _d.sent(), userId = _b.userId, email = _b.email, role = _b.role;
                req.userId = userId;
                req.email = email;
                req.role = role;
                newAccessToken = authUtils_1.generateAccessToken(userId, email, role);
                // Optionally, update the response with the new access token
                res.set('Authorization', "Bearer " + newAccessToken);
                return [4 /*yield*/, users_1["default"].findByPk(userId)];
            case 6:
                user = _d.sent();
                if (!user) return [3 /*break*/, 8];
                return [4 /*yield*/, authUtils_1.updateTokens(user, newAccessToken, refreshToken.toString())];
            case 7:
                _d.sent();
                return [3 /*break*/, 9];
            case 8: return [2 /*return*/, res
                    .status(401)
                    .json({ message: 'Access token expired. Please log in again.' })];
            case 9:
                next();
                return [3 /*break*/, 11];
            case 10:
                error_4 = _d.sent();
                // Refresh token verification failed
                return [2 /*return*/, res.status(401).json({
                        message: 'Refresh token expired or invalid. Please log in again.'
                    })];
            case 11: return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
// Middleware to validate refresh token
exports.validateRefreshToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, _a, userId, email, role, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                refreshToken = req.headers['x-refresh-token'];
                if (!refreshToken) {
                    return [2 /*return*/, res.status(401).json({ message: 'Refresh token not provided' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, authUtils_1.verifyRefreshToken(refreshToken.toString())];
            case 2:
                _a = _b.sent(), userId = _a.userId, email = _a.email, role = _a.role;
                // (req as any).userId = userId; // Adding 'userId' to the request object
                // (req as any).email = email; // Adding 'email' to the request object
                req.userId = userId;
                req.email = email;
                req.role = role;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                return [2 /*return*/, res.status(401).json({ message: error_5.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
