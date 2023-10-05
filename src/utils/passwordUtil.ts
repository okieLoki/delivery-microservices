import bcrypt from 'bcryptjs'
import { vendorPayload } from '../interface/index'
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

export {
    generatePassword,
    generateSalt,
    validatePassword,
    generateToken
}