import { authPayload } from "../dto";
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

}

export {authenticate}

