import { Request, Response } from 'express'
import { handleErrors } from '../utils/index'
import { IFoodDoc } from '../models/Food'
import createError from 'http-errors'
import { Vendor } from '../models'
import {Types} from 'mongoose'

const getFoodAvailability = async (req: Request, res: Response) => {
    const pincode = req.query.pincode

    try {
        if (!pincode) throw new createError.BadRequest('Pincode is required')

        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

        if (result.length === 0) throw new createError.NotFound('No food available')

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        return handleErrors(error, res)
    }
}


const getTopResturants = async (req: Request, res: Response) => {
    const pincode = req.query.pincode

    try {
        if (!pincode) throw new createError.BadRequest('Pincode is required')

        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true })
            .sort([['rating', 'descending']])
            .limit(10)


        if (result.length === 0) throw new createError.NotFound('No resturant found')

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        return handleErrors(error, res)
    }
}

const getFoodin30Mins = async (req: Request, res: Response) => {
    const pincode = req.query.pincode

    try {
        if (!pincode) throw new createError.BadRequest('Pincode is required')

        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

        if (result.length > 0) {
            let foodAvailable = result.map((vendor) => {
                const food = vendor.foods as [IFoodDoc]
                
                return food.filter((food) => {
                    return food.readyTime <= 30
                })
            })
            return res.status(200).json({
                success: true,
                data: foodAvailable
            })
        }
        else {
            throw new createError.NotFound('No food found')
        }

    } catch (error) {
        return handleErrors(error, res)
    }
}

const searchFoods = async (req: Request, res: Response) => {
    const pincode = req.query.pincode

    try {
        if (!pincode) throw new createError.BadRequest('Pincode is required')

        const result = await Vendor.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

        if (result.length > 0) {

            let foodArray = result.map((vendor) => {
                return vendor.foods
            })
            res.status(200).json({
                success: true,
                data: foodArray
            })
        }
        else {
            throw new createError.NotFound('No food found')
        }

    } catch (error) {
        return handleErrors(error, res)
    }
}

const resturantById = async (req: Request, res: Response) => {
    const id = req.params.id

    try {

        if (!id || !Types.ObjectId.isValid(id)) {
            throw new createError.BadRequest('Invalid  or missing id')
        }
        const result = await Vendor.findById(id).populate('foods')

        if (!result) {
            throw new createError.NotFound('No resturant found')
        }

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        handleErrors(error, res)
    }
}

export {
    getFoodAvailability,
    getTopResturants,
    getFoodin30Mins,
    searchFoods,
    resturantById
}