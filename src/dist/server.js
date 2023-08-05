"use strict";
exports.__esModule = true;
var express_1 = require("express");
var sellerRoutes_1 = require("./routes/sellerRoutes");
var buyerRoutes_1 = require("./routes/buyerRoutes");
var authRoutes_1 = require("./routes/authRoutes");
var errorHandler_1 = require("./utils/errorHandler");
var dotenv_1 = require("dotenv");
var sequelize_typescript_1 = require("sequelize-typescript");
var databaseConfig_1 = require("./databaseConfig"); // Import the database configuration
var users_1 = require("./db/models/users");
var addresses_1 = require("./db/models/addresses");
var seller_1 = require("./db/models/seller");
var buyers_1 = require("./db/models/buyers");
var products_1 = require("./db/models/products");
var buyerFavouriteProducts_1 = require("./db/models/buyerFavouriteProducts");
var orders_1 = require("./db/models/orders");
var buyerPaymentMethods_1 = require("./db/models/buyerPaymentMethods");
var paymentMethods_1 = require("./db/models/paymentMethods");
var productOrders_1 = require("./db/models/productOrders");
dotenv_1["default"].config();
console.log(__dirname);
var app = express_1["default"]();
var port = process.env.PORT;
// Use the 'development' configuration from databaseConfig
var sequelize = new sequelize_typescript_1.Sequelize(databaseConfig_1["default"].development);
sequelize.addModels([
    users_1["default"],
    seller_1["default"],
    buyers_1["default"],
    addresses_1["default"],
    products_1["default"],
    buyerFavouriteProducts_1["default"],
    orders_1["default"],
    buyerPaymentMethods_1["default"],
    paymentMethods_1["default"],
    productOrders_1["default"],
]);
sequelize
    // .sync()
    .sync({ alter: true })
    .then(function () {
    console.log('Database connection has been established successfully.');
})["catch"](function (error) {
    console.log('Err', error);
});
app.use(express_1["default"].json());
app.use('/auth', authRoutes_1["default"]);
app.use('/users/seller', sellerRoutes_1["default"]);
app.use('/users/buyer', buyerRoutes_1["default"]);
app.use(errorHandler_1.errorHandler);
app.listen(port, function () {
    console.log("Server is up and running on http://localhost:" + port);
});
