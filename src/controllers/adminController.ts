import { Request, Response, NextFunction } from 'express';
import {createVendorInput} from '../interface/index'
import {Vendor} from '../models/index'

const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    
    const vendor : createVendorInput = req.body;

    const createdVendor = await Vendor.create(vendor)

    return res.status(200).json({
        vendor: vendor.pincode
    })
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