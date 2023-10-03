import express, { Router } from 'express';
import {
    createVendor,
    getVendors,
    getVendorById
} from '../controllers/index'

const router: Router = express.Router();

router.post('/vendor', createVendor);
router.get('/vendors', getVendors);
router.get('/vendor/:id', getVendorById);

export { router as adminRoute }