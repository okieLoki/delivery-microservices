import { Resend } from "resend"
import { otpEmailTemplate } from "../templates/otpEmailTemplate"

const resend = new Resend(process.env.RESEND_API_KEY)

const generateOtp = () => {
    const otpPhone = Math.floor(10000 + Math.random() * 900000)
    const otpEmail = Math.floor(10000 + Math.random() * 900000)

    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return { otpPhone, otpEmail, expiry }
}

const sendSMS = async (otp, toPhoneNo) => {
    try {
        const accontsid = process.env.TWILIO_ACCOUNT_SID
        const authToken = process.env.TWILIO_AUTH_TOKEN
        const client = require('twilio')(accontsid, authToken)

        const response = await client.messages.create({
            body: `Your OTP is ${otp}`,
            to: `+91${toPhoneNo}`,
            from: String(process.env.TWILIO_PHONE_NO),
        })

        return response

    } catch (error) {
        console.error(error)
        return false
    }
}

const sendEmail = async (toEmail, otp) => {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: toEmail,
            subject: 'OTP for Food Delivery App',
            html: otpEmailTemplate(otp)
          });
        
    } catch (error) {
        console.error(error)
        return false
    }
}


const onRequestOTP = async (otpPhone, otpEmail, toPhoneNo, toEmail) => {
    try {
        await Promise.all([
            sendSMS(otpPhone, toPhoneNo),
            sendEmail(toEmail, otpEmail)
        ])
    } catch (error) {
        console.error(error)
        return false
    }
}

export {
    generateOtp,
    onRequestOTP
}