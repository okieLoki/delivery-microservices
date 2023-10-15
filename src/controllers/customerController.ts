import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer'
import { createCustomerInputs } from '../dto'
import createError from 'http-errors'
import {
    generatePassword,
    generateSalt,
    handleErrors,
    generateOtp,
    onRequestOTP,
    generateToken
} from "../utils";
import { Customer } from '../models'

const customerSignup = async (req: Request, res: Response) => {

    try {
        const customer = plainToClass(createCustomerInputs, req.body)
        const errors = await validate(customer)

        if (errors.length > 0) {
            throw createError(400, {
                message: 'Validation Error',
                errors: errors
            })
        }

        const newCustomer = req.body

        const existingCustomer = await Customer.findOne({email: newCustomer.email})
        if(existingCustomer) throw createError.Conflict(`${newCustomer.email} is already registered`)

        const salt = await generateSalt()
        const customerPassword = await generatePassword(newCustomer.password, salt)

        const { otp, expiry } = await generateOtp()

        const result = await Customer.create({
            ...newCustomer,
            password: customerPassword,
            salt,
            otp,
            otp_expiry: expiry
        })

        if (result) {
            await onRequestOTP(otp, newCustomer.phone)

            const token = await generateToken({
                _id: result._id,
                email: result.email,
                verified: result.verified
            })

            return res.status(201).json({
                email: result.email,
                token: token,
                verified: result.verified
            })
        }
        else {
            throw createError(500, 'Internal Server Error')
        }

    } catch (error) {
        handleErrors(error, res)
    }
}

const customerLogin = async (req: Request, res: Response) => {

}

const customerVerify = async (req: Request, res: Response) => {

}

const requestOTP = async (req: Request, res: Response) => {

    const otp = req.body.otp
    const user = req.user
    try {
    
        if(!otp) throw createError.BadRequest('OTP is required')
        if(!user) throw createError.Forbidden()

        const profile = await Customer.findById(user._id)

        if(profile){
            if(profile.otp === parseInt(otp) && new Date() <= profile.otp_expiry){
                profile.verified = true
                await profile.save()

                const token = await generateToken({
                    _id: profile._id,
                    email: profile.email,
                    verified: profile.verified
                })

                return res.status(200).json({
                    email: profile.email,
                    token: token,
                    verified: profile.verified
                })
            }
            else{
                throw createError.BadRequest('OTP is incorrect')
            }
        }

    } catch (error) {
        handleErrors(error, res)
    }
}

const getCustomerProfile = async (req: Request, res: Response) => {

}

const updateCustomerProfile = async (req: Request, res: Response) => {

}

export {
    customerSignup,
    customerLogin,
    customerVerify,
    requestOTP,
    getCustomerProfile,
    updateCustomerProfile
}