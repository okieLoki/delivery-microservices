"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorById = exports.getVendors = exports.createVendor = void 0;
const index_1 = require("../models/index");
const createVendor = async (req, res, next) => {
    const vendor = req.body;
    const createdVendor = await index_1.Vendor.create(vendor);
    return res.status(200).json({
        vendor: vendor.pincode
    });
};
exports.createVendor = createVendor;
const getVendors = (req, res, next) => {
};
exports.getVendors = getVendors;
const getVendorById = (req, res, next) => {
};
exports.getVendorById = getVendorById;
