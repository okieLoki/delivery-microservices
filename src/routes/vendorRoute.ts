import express, { Router } from 'express';
import {
    getVendorProfile,
    updateVendorProfile,
    updateVendorService,
    vendorLogin
} from '../controllers';
import { authenticate } from '../middleware/index'

const router: Router = express.Router();

router.post('/login', vendorLogin)

router.use(authenticate)
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorService)

export { router as vendorRoute }