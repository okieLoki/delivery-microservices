import { Request, Response } from 'express'
import { vendorLoginInputs, vendorEditInputs, createFoodInput } from '../interface/index'
import { findVendor } from './index'
import { validatePassword, handleErrors, generateToken } from '../utils/index'
import { Food } from '../models/index'
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

    try {
        const user = req.user
        if (!user) {
            throw createError.Forbidden('Unauthorized')
        }
        const vendor = await findVendor(user._id)

        return res.status(200).json({
            success: true,
            data: vendor
        })

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

        const dataToChange: vendorEditInputs = req.body;

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


const updateVendorService = async (req: Request, res: Response) => {

    try {
        const user = req.user;

        if (!user) {
            throw createError.Forbidden('Unauthorized')
        }

        const serviceAvailable: boolean = req.body.serviceAvailable;

        if (!serviceAvailable) {
            throw createError.BadRequest('Service availability not provided')
        }

        const vendor = await findVendor(user._id);

        vendor.serviceAvailable = serviceAvailable;

        const savedResult = await vendor.save();

        return res.status(200).json({
            status: true,
            message: "Vendor service updated successfully",
            data: savedResult,
        });

    } catch (error) {
        handleErrors(error, res)
    }
}

const updateVendorCoverImage = async (req: Request, res: Response) => {
    try {
        
        const user = req.user

        if(!user){
            throw createError.Forbidden('Unauthorized')
        }

        const vendor = await findVendor(user._id)

        const files = req.files as [Express.Multer.File]

        const images = files.map((file: Express.Multer.File) => {
            return file.filename
        })

        vendor.coverImage.push(...images);
      
        const savedResult = await vendor.save();

        return res.status(200).json({
            status: true,
            message: "Vendor cover image updated successfully",
            data: savedResult,
        });        

    } catch (error) {
        handleErrors(error, res)
    }
}

const addFood = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const food: createFoodInput = req.body;

        if (!user) {
            throw createError.Forbidden('Unauthorized')
        }

        const vendor = await findVendor(user._id);

        const files = req.files as [Express.Multer.File]

        const images = files.map((file: Express.Multer.File) => {
            return file.filename
        })

        const createdFood = await Food.create({
            ...food,
            vendorId: vendor._id,
            images: images
        })

        vendor.foods.push(createdFood)
        await vendor.save()

        return res.status(200).json({
            status: true,
            message: "Food added successfully",
            data: createdFood,
        });

    } catch (error) {
        handleErrors(error, res)
    }
}

const getFoods = async (req: Request, res: Response) => {
    try {
        const user = req.user;

        if (!user) {
            throw createError.Forbidden('Unauthorized')
        }

        const vendor = await findVendor(user._id);
        const foods = await Food.find({ vendorId: vendor._id })

        return res.status(200).json({
            status: true,
            message: "Foods fetched successfully",
            data: foods,
        });

    } catch (error) {
        handleErrors(error, res)
    }
}

export {
    vendorLogin,
    getVendorProfile,
    updateVendorProfile,
    updateVendorService,
    updateVendorCoverImage,
    addFood,
    getFoods
}

