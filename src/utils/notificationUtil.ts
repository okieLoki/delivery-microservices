import { Resend } from "resend"
import { otpEmailTemplate } from "../templates/otpEmailTemplate"

const resend = new Resend(process.env.RESEND_API_KEY)

const generateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

    return { otp, expiry }
}

const sendSMS = (otp, toPhoneNo) => {
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
        console.error(error)
        return false
    }
}

const sendEmail = async (toEmail, otp) => {
    try {

        resend.emails.send({
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


const onRequestOTP = (otp, toPhoneNo, toEmail, option) => {

    if(option === 'sms'){
        return sendSMS(otp, toPhoneNo)
    }
    else if(option === 'email'){
        return sendEmail(toEmail, otp)
    }
    else{
        return false
    }

}

export {
    generateOtp,
    onRequestOTP
}