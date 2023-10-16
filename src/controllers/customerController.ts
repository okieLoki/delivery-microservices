import { Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer'
import {
    createCustomerInputs,
    userInputLogin
} from '../dto'
import createError from 'http-errors'
import {
    generatePassword,
    generateSalt,
    handleErrors,
    generateOtp,
    onRequestOTP,
    generateToken,
    validatePassword
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

        const existingCustomer = await Customer.findOne({ email: newCustomer.email })
        if (existingCustomer) throw createError.Conflict(`${newCustomer.email} is already registered`)

        const salt = await generateSalt()
        const customerPassword = await generatePassword(newCustomer.password, salt)

        const { otpPhone, otpEmail, expiry } = await generateOtp()

        const result = await Customer.create({
            ...newCustomer,
            password: customerPassword,
            salt,
            otpPhone,
            otpEmail,
            otp_expiry: expiry
        })

        if (result) {
            await onRequestOTP(
                otpPhone,
                otpEmail,
                newCustomer.phone,
                newCustomer.email
            )

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

    try {
        const customerInput = plainToClass(userInputLogin, req.body)
        const errors = await validate(customerInput)

        if (errors.length > 0) {
            throw createError(400, {
                message: 'Validation Error',
                errors: errors
            })
        }

        const customer = await Customer.findOne({ email: customerInput.email })

        if (customer) {
            const validation = await validatePassword(customerInput.password, customer.password, customer.salt)

            if (validation) {
                const token = generateToken({
                    _id: customer._id,
                    email: customer.email,
                    verified: customer.verified
                })

                return res.status(200).json({
                    email: customer.email,
                    token: token,
                    verified: customer.verified
                })
            }
            else {
                throw createError.Unauthorized('Invalid Credentials')
            }
        }
        else {
            throw createError.NotFound('User not found')
        }

    } catch (error) {
        handleErrors(error, res)
    }
}

const customerVerify = async (req: Request, res: Response) => {

    const {otpPhone, otpEmail} = req.body
    const user = req.user
    try {

        if (!otpEmail || !otpEmail) throw createError.BadRequest('OTP is required')
        if (!user) throw createError.Forbidden()

        const profile = await Customer.findById(user._id)

        if (profile) {
            if (profile.otpPhone === parseInt(otpPhone) && profile.otpEmail === parseInt(otpEmail) && new Date() <= profile.otp_expiry) {
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
            else {
                throw createError.BadRequest('OTP is incorrect')
            }
        }

    } catch (error) {
        handleErrors(error, res)
    }

}

const requestOTP = async (req: Request, res: Response) => {

    const user = req.user
    try {
        if(!user) throw createError.Forbidden()

        const profile = await Customer.findById(user._id)

        if(profile) {
            const { otpPhone, otpEmail, expiry } = await generateOtp()

            profile.otpPhone = otpPhone
            profile.otpEmail = otpEmail
            profile.otp_expiry = expiry

            await profile.save()

            await onRequestOTP(
                otpPhone,
                otpEmail,
                profile.phone,
                profile.email
            )

            return res.status(200).json({
                message: 'OTP sent successfully'
            })
        }
        else {
            throw createError.NotFound('User not found')
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