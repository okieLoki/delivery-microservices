"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const createVendor = async (req, res, next) => {
    const vendor = req.body;
    try {
        const existingVendor = await index_1.Vendor.findOne({
            email: vendor.email
        });
        if (existingVendor) {
            throw http_errors_1.default.Conflict(`${vendor.email} is already registered`);
        }
        const salt = await (0, index_2.generateSalt)();
        const hashedPassword = await (0, index_2.generatePassword)(vendor.password, salt);
        const createdVendor = await index_1.Vendor.create({
            ...vendor,
            password: hashedPassword,
            salt: salt
        });
        return res.status(201).json({
            success: true,
            data: createdVendor
        });
    }
    catch (error) {
        return res.status(error.statusCode).json({
            status: 'Error',
            message: error.message
        });
    }
};
exports.createVendor = createVendor;
const getVendors = (req, res, next) => {
};
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => {
};
exports.getVendorById = getVendorById;
