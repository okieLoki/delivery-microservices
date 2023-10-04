import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { handleErrors } from '../middleware/handleErrors'
import { createVendorInput } from '../interface/index'
import { Vendor } from '../models/index'
import { generatePassword, generateSalt } from '../utils/index'


const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const vendor: createVendorInput = req.body;

    try {
        const existingVendor = await Vendor.findOne({
            email: vendor.email
        });

        if (existingVendor) {
            throw createError.Conflict(`${vendor.email} is already registered`);
        }

        const salt = await generateSalt();
        const hashedPassword = await generatePassword(vendor.password, salt);

        const createdVendor = await Vendor.create({
            ...vendor,
            password: hashedPassword,
            salt: salt
        });

        return res.status(201).json({
            success: true,
            data: createdVendor
        });
    } catch (error) {
        return handleErrors(error, res);
    }
};

const getVendors = async (req: Request, res: Response) => {
    try {
        const vendors = await Vendor.find();

        if (!vendors) {
            throw createError.NotFound('No vendors found');
        }

        return res.status(200).json({
            success: true,
            data: vendors
        });
    } catch (error) {
        return handleErrors(error, res);
    }
};

const getVendorById = async (req: Request, res: Response) => {
    const id = req.query.id;

    try {
        const vendorData = await Vendor.findById(id);

        if (!vendorData) {
            throw createError.NotFound('No vendor found');
        }

        return res.status(200).json({
            success: true,
            data: vendorData
        });
        
    } catch (error) {
        return handleErrors(error, res);
    }
};

export {
    createVendor,
    getVendors,
    getVendorById
};
