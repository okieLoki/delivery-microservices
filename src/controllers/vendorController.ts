import { Request as VendorRequest, Response as VendorResponse } from 'express'
import { vendorLoginInputs as VendorLoginInputs } from '../interface/index'
import { findVendor } from './index'
import { validatePassword, handleErrors, generateToken } from '../utils/index'
import createError from 'http-errors'

const vendorLogin = async (req: VendorRequest, res: VendorResponse) => {
    const vendor: VendorLoginInputs = req.body

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

        if(isValidPassword){
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
        else{
            throw createError(401, 'Invalid credentials')
        }



    } catch (error) {
        return handleErrors(error, res)
    }
}

const getVendorProfile = async () => {

}

const updateVendorProfile = async () => {

}

const updateVendorService = async () => {

}

export { vendorLogin }

