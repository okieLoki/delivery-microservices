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
router.get('/profile', authenticate, getVendorProfile)
router.patch('/profile', authenticate, updateVendorProfile)
router.patch('/service', authenticate, updateVendorService)

export { router as vendorRoute }