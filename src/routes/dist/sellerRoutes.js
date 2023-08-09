"use strict";
exports.__esModule = true;
var express_1 = require("express");
var sellerController_1 = require("../controllers/sellerController");
var logger_1 = require("../utils/logger");
var authMiddleware_1 = require("../utils/authMiddleware");
var router = express_1["default"].Router();
// router.post('/', logger, validateRequestBody(parentSchema), createSeller);
router.get('/', logger_1.logger, authMiddleware_1.validateAccessToken, sellerController_1.fetchAllSellersByPagination);
exports["default"] = router;
