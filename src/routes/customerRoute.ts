import express, { Router } from 'express';
import {
    customerLogin,
    customerSignup,
    customerVerify,
    getCustomerProfile,
    requestOTP,
    updateCustomerProfile
} from '../controllers/index'


const router: Router = express.Router();

router.post('/signup', customerSignup)
router.post('/login', customerLogin)


router.patch('/verify', customerVerify)
router.get('/otp', requestOTP)
router.get('/profile', getCustomerProfile)
router.patch('/profile', updateCustomerProfile)


export { router as customerRoute }