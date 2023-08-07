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
exports.acceptOrder = exports.getAllOrdersByUserId = exports.getOrderById = exports.abortOrder = exports.createOrder = void 0;
var orders_1 = require("../db/models/orders");
var productOrders_1 = require("../db/models/productOrders");
var customError_1 = require("../utils/customError");
// const newOrderData = {
//     totalAmount: 100, // Set the total amount for the order
//     orderDate: new Date(), // Set the order date
//     deliveryAddressId: 'address_id_here', // Set the delivery address ID
//     buyerId: 'buyer_id_here', // Set the buyer ID
//     status: OrderStatus.PENDING, // Set the order status (use the appropriate OrderStatus value)
//     products: [
//       {
//         productId: 'product_id_1', // Set the product ID
//         quantity: 2, // Set the quantity of the product
//       },
//       // Add more products if needed
//     ],
//   };
// Function to create an order
exports.createOrder = function (orderData) { return __awaiter(void 0, void 0, void 0, function () {
    var order, _i, _a, productItem, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                return [4 /*yield*/, orders_1["default"].create(orderData)];
            case 1:
                order = _b.sent();
                _i = 0, _a = orderData.products;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                productItem = _a[_i];
                return [4 /*yield*/, productOrders_1["default"].create({
                        productId: productItem.productId,
                        orderId: order.id,
                        quantity: productItem.quantity
                    })];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: 
            // Return the created order
            return [2 /*return*/, order];
            case 6:
                error_1 = _b.sent();
                throw error_1;
            case 7: return [2 /*return*/];
        }
    });
}); };
// const orderIdToCancel = 'order_id_here'; // Provide the ID of the order to cancel
// Function to cancel an order by setting its status to 'CANCELED'
exports.abortOrder = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, orders_1["default"].findByPk(orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw new customError_1.CustomError('Order not found', 404);
                }
                // Set the order status to 'CANCELED'
                // order.status = OrderStatus.CANCELED;
                return [4 /*yield*/, order.save()];
            case 2:
                // Set the order status to 'CANCELED'
                // order.status = OrderStatus.CANCELED;
                _a.sent();
                // Return the updated order
                return [2 /*return*/, order];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
// const orderIdToGet = 'order_id_here'; // Provide the ID of the order to retrieve
// Function to get an order by its ID
exports.getOrderById = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orders_1["default"].findOne({
                        where: { id: orderId },
                        include: [productOrders_1["default"]]
                    })];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw new customError_1.CustomError('Order not found', 404);
                }
                // Return the order with associated product orders
                return [2 /*return*/, order];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrdersByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orders_1["default"].findAll({
                        where: { buyerId: userId },
                        include: [productOrders_1["default"]]
                    })];
            case 1:
                orders = _a.sent();
                // Return the orders
                return [2 /*return*/, orders];
            case 2:
                error_4 = _a.sent();
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
// TODO
// Seller endpoint
// Function to cancel an order by setting its status to 'CANCELED'
exports.acceptOrder = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, orders_1["default"].findByPk(orderId)];
            case 1:
                order = _a.sent();
                if (!order) {
                    throw new customError_1.CustomError('Order not found', 404);
                }
                // Set the order status to 'ACCEPTED'
                // order.status = OrderStatus.ACCEPTED;
                return [4 /*yield*/, order.save()];
            case 2:
                // Set the order status to 'ACCEPTED'
                // order.status = OrderStatus.ACCEPTED;
                _a.sent();
                // Return the updated order
                return [2 /*return*/, order];
            case 3:
                error_5 = _a.sent();
                throw error_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
