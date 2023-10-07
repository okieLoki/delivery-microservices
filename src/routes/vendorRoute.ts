import express, { Router } from 'express';
import {
    getVendorProfile,
    updateVendorProfile,
    updateVendorService,
    vendorLogin,
    getFoods,
    addFood
} from '../controllers';
import { authenticate } from '../middleware/index'

const router: Router = express.Router();

router.post('/login', vendorLogin)

router.use(authenticate)
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorService)

router.post('/food', addFood)
router.get('/foods', getFoods)

export { router as vendorRoute }