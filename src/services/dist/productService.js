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
exports.deleteProduct = exports.fetchProductsBySellerId = exports.createNewProduct = void 0;
var seller_1 = require("../db/models/seller");
var products_1 = require("../db/models/products");
var customError_1 = require("../utils/customError");
exports.createNewProduct = function (reqBodyData, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var seller_2, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, seller_1["default"].findOne({
                        where: { userId: userId }
                    })];
            case 1:
                seller_2 = _a.sent();
                //
                // const user: User | null = await User.findOne({
                //   where: {
                //     email: userData.email,
                //   },
                // });
                // if (!user) {
                //   // If user is not found, create a new user with the sellerData
                //   await User.create({
                //     ...sellerData
                //   });
                // }
                return [2 /*return*/, null];
            case 2:
                error_1 = _a.sent();
                // Handle error if necessary
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.fetchProductsBySellerId = function (sellerId, page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 10; }
    return __awaiter(void 0, void 0, void 0, function () {
        var offset, _a, count, rows, totalPages, hasNextPage, hasPreviousPage, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    offset = (page - 1) * pageSize;
                    return [4 /*yield*/, products_1["default"].findAndCountAll({
                            where: { sellerId: sellerId },
                            offset: offset,
                            limit: pageSize
                        })];
                case 1:
                    _a = _b.sent(), count = _a.count, rows = _a.rows;
                    totalPages = Math.ceil(count / pageSize);
                    hasNextPage = page < totalPages;
                    hasPreviousPage = page > 1;
                    return [2 /*return*/, {
                            products: rows,
                            pagination: {
                                currentPage: page,
                                pageSize: pageSize,
                                totalItems: count,
                                totalPages: totalPages,
                                hasNextPage: hasNextPage,
                                hasPreviousPage: hasPreviousPage
                            }
                        }];
                case 2:
                    error_2 = _b.sent();
                    // Handle error if necessary
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteProduct = function (productId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var product, seller_3, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, products_1["default"].findOne({
                        where: {
                            id: productId,
                            isDeleted: false
                        }
                    })];
            case 1:
                product = _a.sent();
                if (!product) return [3 /*break*/, 6];
                return [4 /*yield*/, seller_1["default"].findByPk(product.sellerId)];
            case 2:
                seller_3 = _a.sent();
                if (!((seller_3 === null || seller_3 === void 0 ? void 0 : seller_3.userId) === userId)) return [3 /*break*/, 4];
                product.isDeleted = true;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, { success: true }];
            case 4: throw new customError_1.CustomError('You are not authorized to delete this product', 401);
            case 5: return [3 /*break*/, 7];
            case 6: throw new customError_1.CustomError('Product not found', 404);
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                throw error_3;
            case 9: return [2 /*return*/];
        }
    });
}); };
