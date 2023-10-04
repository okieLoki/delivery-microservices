import bcrypt from 'bcryptjs'

const generateSalt = async () => {
    return await bcrypt.genSalt()
}

const generatePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export {generatePassword, generateSalt}