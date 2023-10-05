import { Request, Response } from 'express'
import { vendorLoginInputs, vendorEditInputs } from '../interface/index'
import { findVendor } from './index'
import { validatePassword, handleErrors, generateToken } from '../utils/index'
import createError from 'http-errors'

const vendorLogin = async (req: Request, res: Response) => {
    const vendor: vendorLoginInputs = req.body

    try {
        const existingVendor = await findVendor(undefined, vendor.email)

        if (!existingVendor) {
            throw createError(404, 'No vendor found')
        }

        const isValidPassword = await validatePassword(
            vendor.password,
            existingVendor.salt,
            existingVendor.password
        )

        if (isValidPassword) {
            const token = generateToken({
                _id: existingVendor._id,
                email: existingVendor.email,
                name: existingVendor.name,
                foodType: existingVendor.foodType
            })

            return res.status(200).json({
                success: true,
                data: {
                    token: token
                }
            })
        }
        else {
            throw createError(401, 'Invalid credentials')
        }

    } catch (error) {
        return handleErrors(error, res)
    }
}

const getVendorProfile = async (req: Request, res: Response) => {

    const user = req.user

    try {
        if (user) {
            const vendor = await findVendor(user._id)
            
            return res.status(200).json({
                success: true,
                data: vendor
            })
        }
        else {
            throw createError(401, 'Unauthorized')
        }
    } catch (error) {
        return handleErrors(error, res) 
    }

}

const updateVendorProfile = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw createError.Forbidden('Unauthorized')
        }

        const dataToChange = req.body;

        const vendor = await findVendor(user._id);

        vendor.name = dataToChange.name || vendor.name;
        vendor.address = dataToChange.address || vendor.address;
        vendor.phone = dataToChange.phone || vendor.phone;
        vendor.foodType = dataToChange.foodType || vendor.foodType;

        const savedResult = await vendor.save();

        return res.status(200).json({
            status: true,
            message: "Vendor profile updated successfully",
            data: savedResult,
        });

    } catch (error) {
        handleErrors(error, res)
    }
};


const updateVendorService = async () => {

}

export {
    vendorLogin,
    getVendorProfile,
    updateVendorProfile,
    updateVendorService
}

