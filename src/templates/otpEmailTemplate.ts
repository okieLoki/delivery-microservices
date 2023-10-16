export const otpEmailTemplate = (otp) => `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <p>Hello,</p>
        <p>Your OTP is: <strong style="font-size: 20px; color: #0073e6;">${otp}</strong></p>
        <p>It is valid for 30 minutes.</p>
    </div>
`;
