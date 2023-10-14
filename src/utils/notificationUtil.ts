
const generateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return { otp, expiry }
}

const onRequestOTP = (otp, toPhoneNo) => {
    try {
        
        const accontsid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const client = require('twilio')(accontsid, authToken)

        const response = client.messages.create({
            body: `Your OTP is ${otp}`,
            to: `+91${toPhoneNo}`,
            from: String(process.env.TWILIO_PHONE_NO),
        })

        return response

    } catch (error) {
        return false
    }
}

export {
    generateOtp,
    onRequestOTP
}