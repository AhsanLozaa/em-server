"use strict";
exports.__esModule = true;
var express_1 = require("express");
var logger_1 = require("../utils/logger");
var authMiddleware_1 = require("../utils/authMiddleware");
var productsController_1 = require("../controllers/productsController");
var router = express_1["default"].Router();
router.get('/', logger_1.logger, authMiddleware_1.validateAccessToken, productsController_1.getProductsBySellerId);
exports["default"] = router;
