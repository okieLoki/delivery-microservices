"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const router = express_1.default.Router();
exports.adminRoute = router;
router.post('/vendor', index_1.createVendor);
router.get('/vendors', index_1.getVendors);
router.get('/vendor/:id', index_1.getVendorById);
