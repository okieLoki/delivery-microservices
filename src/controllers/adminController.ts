import  createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { createVendorInput } from '../interface/index'
import { Vendor } from '../models/index'
import { generatePassword, generateSalt } from '../utils/index'

const createVendor = async (req: Request, res: Response, next: NextFunction) => {

    const vendor: createVendorInput = req.body;

    try {

         const existingVendor = await Vendor.findOne({
            email: vendor.email
        })

        if(existingVendor){
            throw createError.Conflict(`${vendor.email} is already registered`)
        }

        const salt = await generateSalt()
        const hashedPassword = await generatePassword(vendor.password, salt)

        const createdVendor = await Vendor.create({
            ...vendor,
            password: hashedPassword,
            salt: salt
        })

        return res.status(201).json({
            success: true,
            data: createdVendor
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            status: 'Error',
            message: error.message
        })
    }

}

const getVendors = (req: Request, res: Response, next: NextFunction) => {

}

const getVendorById = (req: Request, res: Response, next: NextFunction) => {

}

export {
    createVendor,
    getVendors,
    getVendorById
}