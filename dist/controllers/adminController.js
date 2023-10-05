"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorById = exports.getVendors = exports.createVendor = exports.findVendor = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const findVendor = async (id, email) => {
    try {
        const vendor = await index_1.Vendor.findOne({
            $or: [
                { _id: id },
                { email: email },
            ],
        });
        if (!vendor) {
            throw (0, http_errors_1.default)(404, 'No vendor found');
        }
        return vendor;
    }
    catch (error) {
        throw error;
    }
};
exports.findVendor = findVendor;
const createVendor = async (req, res) => {
    const vendor = req.body;
    try {
        const existingVendor = await findVendor(undefined, vendor.email);
        if (existingVendor) {
            throw (0, http_errors_1.default)(409, `${vendor.email} is already registered`);
        }
        const salt = await (0, index_2.generateSalt)();
        const hashedPassword = await (0, index_2.generatePassword)(vendor.password, salt);
        const createdVendor = await index_1.Vendor.create({
            ...vendor,
            password: hashedPassword,
            salt: salt,
        });
        return res.status(201).json({
            success: true,
            data: createdVendor,
        });
    }
    catch (error) {
        return (0, index_2.handleErrors)(error, res);
    }
};
exports.createVendor = createVendor;
const getVendors = async (req, res) => {
    try {
        const vendors = await index_1.Vendor.find();
        if (!vendors.length) {
            throw (0, http_errors_1.default)(404, 'No vendors found');
        }
        return res.status(200).json({
            success: true,
            data: vendors,
        });
    }
    catch (error) {
        return (0, index_2.handleErrors)(error, res);
    }
};
exports.getVendors = getVendors;
const getVendorById = async (req, res) => {
    const id = req.query.id;
    try {
        const vendorData = await findVendor(String(id));
        if (!vendorData) {
            throw (0, http_errors_1.default)(404, 'No vendor found');
        }
        return res.status(200).json({
            success: true,
            data: vendorData,
        });
    }
    catch (error) {
        return (0, index_2.handleErrors)(error, res);
    }
};
exports.getVendorById = getVendorById;
