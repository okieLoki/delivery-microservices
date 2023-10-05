import { Request } from 'express'
import bcrypt from 'bcryptjs'
import { vendorPayload, authPayload } from '../interface/index'
import jwt from 'jsonwebtoken'

const generateSalt = async () => {
    return await bcrypt.genSalt()
}

const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

const validatePassword = async (password: string, salt: string, hashedPassword: string) => {
    return await generatePassword(password, salt) === hashedPassword
}

const generateToken = (payload: vendorPayload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: '1d'
        }
    )
}

const validateToken = async (req: Request) => {

    const token = req.header('Authorization')

    if(token){
        const payload = jwt.verify(
            token.split(' ')[1],
            process.env.JWT_SECRET as string
        ) as authPayload

        req.user = payload
        return true
    }
    return false
}

export {
    generatePassword,
    generateSalt,
    validatePassword,
    generateToken,
    validateToken
}