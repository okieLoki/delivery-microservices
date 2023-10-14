import {Request, Response} from "express";
import { validate } from "class-validator";
import {plainToClass} from 'class-transformer'
import {createCustomerInputs} from '../dto/index'
import createError from 'http-errors'
import { handleErrors } from "../utils";

const customerSignup = async (req: Request, res: Response) => {

    try {
        const customer = plainToClass(createCustomerInputs, req.body)
        const errors = await validate(customer)

        if(errors.length > 0){
            throw createError(400, {
                message: 'Validation Error',
                errors: errors
            })
        }

        return res.status(201).json({customer})
        
    } catch (error) {
        handleErrors(error, res)
    }    
}

const customerLogin = async (req: Request, res: Response) => {

}

const customerVerify = async (req: Request, res: Response) => {

}

const requestOTP = async (req: Request, res: Response) => {

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