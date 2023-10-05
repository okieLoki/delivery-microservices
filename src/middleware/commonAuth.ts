import { authPayload } from "../interface";
import { Request, Response, NextFunction } from "express";
import { validateToken } from '../utils/index'

declare global {
    namespace Express {
        interface Request {
            user?: authPayload
        }
    }
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = validateToken(req)

    if (validate) {
        next()
    }

    // res.status(401).json({
    //     success: false,
    //     message: 'Unauthorized'
    // })

}

export {authenticate}

