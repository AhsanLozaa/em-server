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
exports.removeProduct = exports.createProduct = exports.getAllProductsByPagination = exports.getProductsBySellerId = void 0;
var productService_1 = require("../services/productService");
var customError_1 = require("../utils/customError");
exports.getProductsBySellerId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sellerId, _a, _b, page, _c, limit, data, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                sellerId = req.params.sellerId;
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                data = {};
                if (!sellerId) return [3 /*break*/, 2];
                return [4 /*yield*/, productService_1.fetchProductsBySellerId(sellerId.toString(), +page, +limit)];
            case 1:
                // const  sellerData = new Seller(req.body);
                data = _d.sent();
                _d.label = 2;
            case 2:
                res.status(201).json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                res
                    .status(500)
                    .json({ message: 'Failed to create seller', error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllProductsByPagination = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, page, _c, limit, data, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                data = {};
                return [4 /*yield*/, productService_1.fetchAllProductsByPagination(+page, +limit)];
            case 1:
                data = _d.sent();
                res.status(201).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _d.sent();
                res
                    .status(500)
                    .json({ message: 'Failed to create seller', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// TODO - finish this function
// sample request json
// {
//   "id": "1a27d6c2-53ef-4872-93af-24eab0417f99",
//   "sellerId": "03c262fd-425c-45e5-b3b0-b3aa1f81a775",
//   "name": "Fresh Bread",
//   "description": "Delicious freshly baked bread",
//   "price": 499,
//   "stockQuantity": 100,
//   "image": "https://example.com/bread.jpg",
//   "category": "Bakery"
// }
exports.createProduct = function (req, res) {
    try {
        var userId = req.userId;
        res.status(201).json({});
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Failed to create seller', error: error.message });
    }
};
exports.removeProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, productService_1.deleteProduct(req.params.productId, req.userId)];
            case 1:
                data = _a.sent();
                res.status(201).json(data);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (error_3 instanceof customError_1.CustomError) {
                    res
                        .status(error_3.statusCode)
                        .json({ message: 'Failed to delete product', error: error_3.message });
                }
                else {
                    res
                        .status(500)
                        .json({ message: 'Failed to delete product', error: error_3.message });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
