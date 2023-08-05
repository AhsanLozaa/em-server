"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var sequelize_typescript_1 = require("sequelize-typescript");
var uuid_1 = require("uuid");
var addresses_1 = require("./addresses");
var products_1 = require("./products");
var orders_1 = require("./orders");
var paymentMethods_1 = require("./paymentMethods");
var buyerPaymentMethods_1 = require("./buyerPaymentMethods");
var buyerFavouriteProducts_1 = require("./buyerFavouriteProducts");
var users_1 = require("./users");
var Buyer = /** @class */ (function (_super) {
    __extends(Buyer, _super);
    function Buyer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Default(uuid_1.v4),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            allowNull: false,
            primaryKey: true
        })
    ], Buyer.prototype, "id");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return users_1["default"]; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            allowNull: false
        })
    ], Buyer.prototype, "userId");
    __decorate([
        sequelize_typescript_1.BelongsToMany(function () { return products_1["default"]; }, function () { return buyerFavouriteProducts_1["default"]; })
    ], Buyer.prototype, "favoriteProducts");
    __decorate([
        sequelize_typescript_1.HasMany(function () { return orders_1["default"]; })
    ], Buyer.prototype, "orders");
    __decorate([
        sequelize_typescript_1.BelongsToMany(function () { return paymentMethods_1["default"]; }, function () { return buyerPaymentMethods_1["default"]; })
    ], Buyer.prototype, "paymentMethods");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return addresses_1["default"]; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            allowNull: true
        })
    ], Buyer.prototype, "billingAddressId");
    __decorate([
        sequelize_typescript_1.BelongsTo(function () { return addresses_1["default"]; })
    ], Buyer.prototype, "billingAddress");
    Buyer = __decorate([
        sequelize_typescript_1.Table({
            timestamps: false,
            tableName: 'buyers'
        })
    ], Buyer);
    return Buyer;
}(sequelize_typescript_1.Model));
exports["default"] = Buyer;
