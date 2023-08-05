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
// models/product.model.ts
var sequelize_typescript_1 = require("sequelize-typescript");
var uuid_1 = require("uuid");
var seller_1 = require("./seller");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.Default(uuid_1.v4),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            allowNull: false,
            primaryKey: true
        })
    ], Product.prototype, "id");
    __decorate([
        sequelize_typescript_1.ForeignKey(function () { return seller_1["default"]; }),
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.UUID,
            allowNull: false
        })
    ], Product.prototype, "sellerId");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "name");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "description");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Product.prototype, "price");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.INTEGER,
            allowNull: false
        })
    ], Product.prototype, "stockQuantity");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "image");
    __decorate([
        sequelize_typescript_1.Column({
            type: sequelize_typescript_1.DataType.STRING,
            allowNull: false
        })
    ], Product.prototype, "category");
    Product = __decorate([
        sequelize_typescript_1.Table({
            timestamps: false,
            tableName: 'products'
        })
    ], Product);
    return Product;
}(sequelize_typescript_1.Model));
exports["default"] = Product;
